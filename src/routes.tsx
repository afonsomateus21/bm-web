import { createBrowserRouter } from "react-router";
import { CreateOrEditAppointment, HomePage, Login, UserRegister, ServicesPage, ProfessionalsPage, ServiceRegister, ServiceEdit } from "./pages";
import { LoginRoute, ProtectedRoute, SchedulingRoute } from "./components";
import { SchedulingList } from "./pages/SchedulingList";

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
        path: "appointments",
        element: <SchedulingRoute />,
        children: [
          {
            path: "",
            element: <SchedulingList />
          },
          {
            path: "create",
            element: <CreateOrEditAppointment />
          },
          {
            path: "edit/:id",
            element: <CreateOrEditAppointment />
          }
        ]
      }
    ]
  }
])