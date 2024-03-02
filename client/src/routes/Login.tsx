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
  email: z.string().email().min(2).max(100),
  password: z.string().min(6).max(200),
})

export default function Login() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post("/user/login", values)
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
      <h1 className="font-bold text-4xl tracking-tighter">Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

          <Button>Log in</Button>
        </form>
      </Form>

      <p>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}
