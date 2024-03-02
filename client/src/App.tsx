import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home"
import Register from "./routes/Register"
import Login from "./routes/Login"
import AuthProvider from "./providers/AuthProvider"
import Dashboard from "./routes/Dashboard"
import AuthRoute from "./routes/AuthRoute"
import CreateForm from "./routes/CreateForm"
import Settings from "./routes/Settings"
import Display, { loader as displayLoader } from "./routes/Display"

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
    path: "/music/:id",
    element: <Display />,
    loader: displayLoader,
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/page/create",
        element: <CreateForm />,
      },
      {
        path: "/settings",
        element: <Settings />,
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
