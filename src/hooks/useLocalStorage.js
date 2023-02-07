import { tokenKey } from '@/config'

export default function useLocalStorage () {
  function persist (payload = {}) {
    window.localStorage.setItem(tokenKey, JSON.stringify(payload))
  }

  function get () {
    return JSON.parse(window.localStorage.getItem(tokenKey))
  }

  function hasUser () {
    const user = get()
    return user != null && user.roles != null && user.roles.length > 0 && user.access_token != null
  }

  function getRoles () {
    if (!hasUser) {
      return []
    }
    return get().roles
  }

  function getToken () {
    if (!hasUser) {
      return ''
    }
    return get().access_token
  }

  return { persist, get, getToken, getRoles }
}
