import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home"
import Register from "./routes/Register"
import Login from "./routes/Login"
import AuthProvider from "./providers/AuthProvider"
import Dashboard from "./routes/Dashboard"
import AuthRoute from "./routes/AuthRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
])

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
