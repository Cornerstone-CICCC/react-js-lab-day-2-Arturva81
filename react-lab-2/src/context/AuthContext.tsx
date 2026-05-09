import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface AuthContextType {
  name: string
  isLoggedIn: boolean
  login: (name: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function login(name: string) {
    setName(name)
    setIsLoggedIn(true)
  }

  function logout() {
    setName('')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ name, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
