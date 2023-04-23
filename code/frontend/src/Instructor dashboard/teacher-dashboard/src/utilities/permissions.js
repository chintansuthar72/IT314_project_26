import universalCookies from 'universal-cookie'
import { apiGet } from '../api/apiEndpoints'
import { useState, useEffect } from 'react'

const getSession = () => {
  const cookies = new universalCookies()
  return cookies.get('sessionID')
}

/**
 * Validates if the user is logged in.
 * @returns {boolean} true if the user is logged in.
 */
const _checkSession = async () => {
  try {
    let result = await apiGet('/validate')
    if (result.data === 'OK') {
      return true
    }
    return false
  } catch {
    return false
  }
}

const useAuthentication = () => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [loadingAuth, setLoading] = useState(true)

  useEffect(() => {
    _checkSession().then(result => {
      setLoading(false)
      setAuthenticated(result)
    })
  }, [])

  return { loadingAuth, isAuthenticated }
}

export { getSession, useAuthentication }
