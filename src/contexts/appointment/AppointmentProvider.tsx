import { useState } from "react"
import { AppointmentContext } from "./AppointmentContext"
import { Appointment, AppointmentFormInput, CustomProviderProps } from "../../types"
import { api } from "../../services";

export const AppointmentProvider = ({ children }: CustomProviderProps) => {
  const [ appointment, setAppointment ] = useState<Appointment | null>();

  async function createAppointment(appointmentInput: AppointmentFormInput) {
    try {
      const appointment = {
        "professional_id": appointmentInput.professionalId,
        "customer_id": appointmentInput.customerId,
        "service_id": appointmentInput.serviceId,
        "date": appointmentInput.date,
        "hour": appointmentInput.hour,
        "is_notifiable": appointmentInput.isNotifiable
      }
      const response = await api.post("/appointments", appointment);
        
      return response.data;
    } catch(error) {
      console.log(error);
    } 
  }

  return (
    <AppointmentContext.Provider value={{ appointment, createAppointment }}>
      { children }
    </AppointmentContext.Provider>
  )
}