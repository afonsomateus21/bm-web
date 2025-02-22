import { createBrowserRouter } from "react-router";
import { CustomerHome, Login, UserRegister, ServicesPage } from "./pages";
import { LoginRoute, ProtectedRoute } from "./components";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginRoute />,
    children: [
      {
        path: "login",
        element: <Login />
      }
    ]
  }, 
  {
    path: '/register',
    element: <UserRegister />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: "home",
        element: <CustomerHome />
      },
      {
        path: "services/",
        element: <ServicesPage />,
      },
    ]
  }
])