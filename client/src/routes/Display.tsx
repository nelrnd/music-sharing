import { Link, useLoaderData } from "react-router-dom"
import axios from "../axios"
import { Button } from "@/components/ui/button"
import { BiMusic } from "react-icons/bi"

export async function loader({ params }) {
  try {
    const { id } = params
    const res = await axios.get(`/page/${id}`)
    if (!res || !res.data) {
      throw new Error("Not found")
    }
    return res.data
  } catch (err) {
    console.log(err)
    return null
  }
}

export default function Display() {
  const page = useLoaderData()

  if (!page) return <p>Not found...</p>

  return (
    <div className="w-[24rem] max-w-full m-auto px-4 py-8 space-y-8">
      <div className="aspect-square w-[16rem] max-w-full bg-gray-400 m-auto">
        {page.image_url ? <img src={page.image_url} alt="" /> : <BiMusic />}
      </div>

      <h1 className="text-center font-bold text-2xl">
        {page.name} - {page.artist_name}
      </h1>

      {page.links.map((link) => (
        <LinkButton key={link.platform} link={link} />
      ))}
    </div>
  )
}

function LinkButton({ link }) {
  return (
    <Button variant="outline" className="w-full" asChild>
      <Link to={link.href}>Listen on {link.platform}</Link>
    </Button>
  )
}
