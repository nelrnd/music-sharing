import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/AuthProvider"

export default function Dashboard() {
  const { setUser } = useAuth()

  function logout() {
    setUser()
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
