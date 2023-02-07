import { tokenKey } from '@/config'

export default function useLocalStorage () {
  function persist (payload = {}) {
    window.localStorage.setItem(tokenKey, JSON.stringify(payload))
  }

  function get () {
    return JSON.parse(window.localStorage.getItem(tokenKey))
  }

  function getRoles () {
    return get().roles
  }

  function getToken () {
    return get().access_token
  }

  return { persist, get, getToken, getRoles }
}
