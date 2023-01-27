import axios from 'axios'
import AuthService from './auth'

const API_ENVS = {
  production: 'https://rhfactor-api.herokuapp.com',
  development: 'http://localhost:5000',
  local: 'http://localhost:5000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})

export default {
  auth: AuthService(httpClient)
}
