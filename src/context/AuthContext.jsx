/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback } from 'react'
import * as api from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const checkAuth = useCallback(async () => {
    try {
      const data = await api.fetchUser()
      setUser(data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth()
  }, [checkAuth])

  async function loginUser(email, password) {
    setError(null)
    try {
      await api.getCsrfCookie()
      const data = await api.login(email, password)
      setUser(data.user)
    } catch (err) {
      const message = err.errors?.email?.[0] || err.message || 'Login failed'
      setError(message)
      throw err
    }
  }

  async function registerUser(name, email, password) {
    setError(null)
    try {
      await api.getCsrfCookie()
      const data = await api.register(name, email, password)
      setUser(data.user)
    } catch (err) {
      const firstError = Object.values(err.errors || {}).flat()[0]
      setError(firstError || err.message || 'Registration failed')
      throw err
    }
  }

  async function logoutUser() {
    try {
      await api.logout()
    } catch {
      // Even if logout API fails, clear local state
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
