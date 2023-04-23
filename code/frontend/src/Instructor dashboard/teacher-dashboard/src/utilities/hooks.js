import { useState } from 'react'
import universalCookies from 'universal-cookie'

export const useCookie = (key, initialValue) => {
  const cookies = new universalCookies()
  const [item, setInnerValue] = useState(() => {
    return cookies.get(key) || initialValue
  })

  const setValue = (value, options) => {
    setInnerValue(value)
    cookies.set(key, value, options)
  }

  return [item, setValue]
}
