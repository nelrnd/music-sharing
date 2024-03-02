import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import axios from "../axios"
import { useAuth } from "@/providers/AuthProvider"
import { useEffect } from "react"

const formSchema = z.object({
  full_name: z.string().min(2).max(50),
  artist_name: z.string().min(2).max(50),
  email: z.string().email().min(2).max(100),
  password: z.string().min(6).max(200),
  password_confirm: z.string().min(6).max(200),
})

export default function Register() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      artist_name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post("/user/register", values)
    const { user } = res.data
    if (user) {
      setUser(user)
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  return (
    <div>
      <h1 className="font-bold text-4xl tracking-tighter">Register</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
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
                <FormLabel>
                  Artist name <span>(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Register</Button>
        </form>

        <p>
          Have an account already? <Link to="/login">Log in</Link>
        </p>
      </Form>
    </div>
  )
}
