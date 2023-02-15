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
    const hasUser = user != null && user.roles != null && user.roles.length > 0 && user.access_token != null
    return hasUser
  }

  function getRoles () {
    if (!hasUser()) {
      return []
    }
    return get().roles
  }

  function getToken () {
    if (!hasUser()) {
      return ''
    }
    return get().access_token
  }

  function getLastPublishDate () {
    return JSON.parse(window.localStorage.getItem('publish_date'))
  }
  function setLastPublishDate (date) {
    return window.localStorage.setItem('publish_date', JSON.parse(date))
  }

  return { persist, get, getToken, getRoles, getLastPublishDate, setLastPublishDate }
}
