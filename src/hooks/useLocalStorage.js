import { tokenKey } from '@/config'

export default function useLocalStorage () {
  function persist (payload = {}) {
    console.log('persist new token', payload)
    window.localStorage.setItem(tokenKey, payload)
  }

  function get () {
    return window.localStorage.getItem(tokenKey)
  }

  return { persist, get }
}
