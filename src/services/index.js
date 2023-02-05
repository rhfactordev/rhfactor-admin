import axios from 'axios'
import router from '../router'
import { setGlobalLoading } from '../store/global'
import AuthService from './auth'
import UserService from './user'
import AspectService from './aspects'
import useLocalStorage from '@/hooks/useLocalStorage'

const localStorage = useLocalStorage()

const API_ENVS = {
  production: 'https://rhfactor-api.herokuapp.com',
  development: 'http://localhost:3000',
  local: 'http://localhost:5000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})

const avoidAuthURis = ['/login']

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  if (avoidAuthURis.includes(config.url)) {
    return config
  }

  const token = localStorage.get()
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
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
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  if (error.response.status === 401) {
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  user: UserService(httpClient),
  aspect: AspectService(httpClient)
}
