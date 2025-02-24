import { createBrowserRouter } from "react-router";
import {
  HomePage,
  Login,
  UserRegister,
  ServicesPage,
  ProfessionalsPage,
  ServiceRegister,
  ServiceEdit,
  ProfessionalRegister,
  ProfessionalEdit
} from "./pages";
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
        path: "services/create",
        element: <ServiceRegister />,
      },
      {
        path: "services/edit/:id",
        element: <ServiceEdit />,
      },
      {
        path: "professionals/",
        element: <ProfessionalsPage />,
      },
      {
        path: "professionals/create",
        element: <ProfessionalRegister />,
      },
      {
        path: "professionals/edit/:id",
        element: <ProfessionalEdit />,
      },
    ]
  }
])