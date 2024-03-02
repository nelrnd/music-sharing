import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { BiChevronLeft, BiInfoCircle } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import axios from "../axios"
import { useAuth } from "@/providers/AuthProvider"

const TYPES = [
  { text: "Single", value: "SINGLE" },
  { text: "Album/EP", value: "ALBUM" },
]

const PLATFORMS = [
  {
    name: "Spotify",
    ref: "spotify_link",
  },
  {
    name: "Apple Music",
    ref: "apple_link",
  },
  {
    name: "Deezer",
    ref: "deezer_link",
  },
  {
    name: "YouTube Music",
    ref: "youtube_link",
  },
  {
    name: "Amazon Music",
    ref: "amazon_link",
  },
  {
    name: "Soundcloud",
    ref: "soundcloud_link",
  },
]

const formSchema = z.object({
  name: z.string().min(2).max(100),
  artist_name: z.string().min(2).max(100),
  image_url: z.string().url().min(2).max(200),
  type: z.enum(["SINGLE", "ALBUM"]),
  spotify_link: z.string().url().min(2).max(200).optional().or(z.literal("")),
  apple_link: z.string().url().min(2).max(200).optional().or(z.literal("")),
  deezer_link: z.string().url().min(2).max(200).optional().or(z.literal("")),
  youtube_link: z.string().url().min(2).max(200).optional().or(z.literal("")),
  amazon_link: z.string().url().min(2).max(200).optional().or(z.literal("")),
  soundcloud_link: z.string().url().min(2).max(200).optional().or(z.literal("")),
})

export default function CreateForm() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      artist_name: "",
      image_url: "",
      type: "SINGLE",
      spotify_link: "",
      apple_link: "",
      deezer_link: "",
      youtube_link: "",
      amazon_link: "",
      soundcloud_link: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const links = PLATFORMS.filter((platform) => values[platform.ref]).map((platform) => ({
        platform: platform.name,
        href: values[platform.ref],
      }))

      const data = {
        name: values.name,
        artist_name: values.artist_name,
        image_url: values.image_url,
        type: values.type,
        links,
      }

      await axios.post("/page", data)

      navigate("/dashboard")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-[32rem] max-w-full m-auto px-4 py-8 space-y-8">
      <header>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="text-xl" asChild>
            <Link to="/dashboard">
              <BiChevronLeft />
              <span className="sr-only">Go Back</span>
            </Link>
          </Button>
          <h1 className="text-4xl font-bold tracking-tighter">Create a page</h1>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <section className="space-y-4 border border-gray-100 rounded-xl p-8">
            <h3 className="font-bold text-xl">Info</h3>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Single/album name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="artist_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={TYPES[0].value}
                      className="flex items-center gap-8"
                    >
                      {TYPES.map((type) => (
                        <FormItem key={type.value} className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={type.value} />
                          </FormControl>
                          <FormLabel className="font-normal">{type.text}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </section>

          <section className="space-y-4 border border-gray-100 rounded-xl p-8">
            <h3 className="font-bold text-xl">Links</h3>

            {PLATFORMS.map((platform) => (
              <FormField
                key={platform.ref}
                control={form.control}
                name={platform.ref}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{platform.name}</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="px-3 py-2 rounded-md bg-gray-100 text-gray-600">
              <BiInfoCircle className="inline relative bottom-0.5" /> You can leave some fields empty
            </div>
          </section>

          <Button type="submit" className="w-full">
            Create page
          </Button>

          <Button type="button" variant="outline" className="w-full" asChild>
            <Link to="/dashboard">Cancel</Link>
          </Button>
        </form>
      </Form>
    </div>
  )
}
