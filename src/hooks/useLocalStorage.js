import { tokenKey } from '@/config'

export default function useLocalStorage () {
  function persist (payload = {}) {
    window.localStorage.setItem(tokenKey, payload)
  }

  function get () {
    return window.localStorage.getItem(tokenKey)
  }

  return { persist, get }
}
