import { createBrowserRouter } from "react-router";
import { CreateOrEditAppointment, CustomerHome, Login, UserRegister } from "./pages";
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
        element: <CustomerHome />
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
          }
        ]
      }
    ]
  }
])