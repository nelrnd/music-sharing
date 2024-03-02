import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"

export default function AuthRoute() {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to="/login" />
}
