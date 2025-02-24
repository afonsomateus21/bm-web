import { useContext } from "react";
import { AppointmentContext } from "../contexts";

export function useAppointment() {
  const context = useContext(AppointmentContext);

  return context;
}