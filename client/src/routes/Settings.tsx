import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/AuthProvider"
import { BiChevronLeft } from "react-icons/bi"
import { Link } from "react-router-dom"

export default function Settings() {
  const { setUser } = useAuth()

  function logout() {
    setUser()
  }

  return (
    <div className="w-[32rem] max-w-full m-auto px-4 py-8 space-y-8">
      <header>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="text-lg" asChild>
            <Link to="/dashboard">
              <BiChevronLeft />
              <span className="sr-only">Go back</span>
            </Link>
          </Button>
          <h1 className="font-bold text-4xl tracking-tighter">Settings</h1>
        </div>
      </header>

      <section>
        <Button onClick={logout} className="w-full">
          Logout
        </Button>
      </section>
    </div>
  )
}
