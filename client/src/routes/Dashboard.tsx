import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/AuthProvider"
import { useEffect, useState } from "react"
import { BiCog } from "react-icons/bi"
import { Link } from "react-router-dom"
import axios from "../axios"

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="w-[32rem] max-w-full m-auto px-4 py-8 space-y-8">
      <header>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-4xl tracking-tighter">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {user.full_name}</p>
          </div>
          <Button variant="outline" size="icon" className="text-base" asChild>
            <Link to="/settings">
              <BiCog />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
        </div>
      </header>

      <PagesSection />
    </div>
  )
}

function PagesSection() {
  const { user } = useAuth()

  const [pages, setPages] = useState([])

  useEffect(() => {
    const fetchPages = async () => {
      if (user) {
        const res = await axios.get(`/user/${user.id}/pages`)
        const pages = res.data
        setPages(pages)
      } else {
        setPages([])
      }
    }
    fetchPages()
  }, [user])

  return (
    <section className="space-y-4">
      <h2 className="font-bold text-xl tracking-tighter">My pages</h2>

      {pages.length > 0 ? (
        pages.map((page) => <p>{page.name}</p>)
      ) : (
        <p className="text-gray-600">No pages here for now...</p>
      )}

      <Button asChild className="w-full">
        <Link to="/page/create">Create new page</Link>
      </Button>
    </section>
  )
}
