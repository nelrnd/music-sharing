import { createContext, useState, useEffect, useContext, useMemo } from "react"
import axios from "../axios"

const AuthContext = createContext({})

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser_] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  function setUser(user: { id: string; full_name: string; artist_name: string; token: string }) {
    setUser_(user)
  }

  useEffect(() => {
    if (user && user.token) {
      axios.defaults.headers.common["x-access-token"] = user.token
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      delete axios.defaults.headers.common["x-access-token"]
      localStorage.removeItem("user")
    }
  }, [user])

  const contextValue = useMemo(() => ({ user, setUser }), [user])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
