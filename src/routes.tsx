import { createBrowserRouter } from "react-router";
import { HomePage, Login, UserRegister, ServicesPage, ProfessionalsPage } from "./pages";
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
        element: <HomePage />
      },
      {
        path: "services/",
        element: <ServicesPage />,
      },
      {
        path: "professionals/",
        element: <ProfessionalsPage />,
      },
    ]
  }
])