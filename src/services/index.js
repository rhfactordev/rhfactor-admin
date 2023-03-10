import axios from 'axios'
import router from '../router'
import { setGlobalLoading } from '../store/global'
import AuthService from './auth'
import CrudService from './crud'
import useLocalStorage from '@/hooks/useLocalStorage'
import SiteService from './site'
import BlogService from './blog'

const localStorage = useLocalStorage()

const API_ENVS = {
  production: 'https://rhfactor-api.herokuapp.com',
  development: 'http://localhost:5000', // <-- Mudar esse
  local: 'http://localhost:5000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})

const avoidAuthURis = ['/login']

httpClient.interceptors.request.use(config => {
  // TODO: Adicionar sinal de is loading

  if (avoidAuthURis.includes(config.url)) {
    return config
  }

  const token = localStorage.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  console.log('httpClient.interceptors.response', error)

  const canThrowAnError = error.request.status === 0 ||
    error.request.status === 500

  if (canThrowAnError) {
    console.log('canThrowAnError', canThrowAnError)
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  if (error.response.status === 401) {
    console.log('errorAuth')
    router.push({ name: 'login' })
  }

  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  crud: CrudService(httpClient),
  site: SiteService(httpClient),
  blog: BlogService(httpClient)
}
