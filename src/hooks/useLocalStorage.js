import { tokenKey } from '@/config'

export default function useLocalStorage () {
  function persist (payload = {}) {
    console.log('useLocalStorage.persist', tokenKey, payload)
    window.localStorage.setItem(tokenKey, payload)
  }

  function get () {
    console.log('useLocalStorage.get', tokenKey)
    return window.localStorage.getItem(tokenKey)
  }

  return { persist, get }
}
