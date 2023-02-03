import axios from 'axios'
import router from '../router'
import { tokenKey } from '@/config'
import { setGlobalLoading } from '../store/global'
import AuthService from './auth'
import UserService from './user'
import AspectService from './aspects'

const API_ENVS = {
  production: 'https://rhfactor-api.herokuapp.com',
  development: 'http://localhost:5000',
  local: 'http://localhost:5000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem(tokenKey)

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
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
