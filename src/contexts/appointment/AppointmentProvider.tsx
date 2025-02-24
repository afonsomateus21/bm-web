import { useEffect, useState } from "react"
import { AppointmentContext } from "./AppointmentContext"
import { Appointment, AppointmentFormInput, CustomProviderProps, User } from "../../types"
import { api } from "../../services";
import { useAuth } from "../../hooks";

export const AppointmentProvider = ({ children }: CustomProviderProps) => {
  const [ appointment, setAppointment ] = useState<Appointment | null>();
  const [ professionals, setProfessionals ] = useState<{ label: string; value: string }[]>([]);
  
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchProfessionals = async () => {
      const response = await getProfessionals();
      setProfessionals(response);
    }

    fetchProfessionals();
  }, []);



  async function createAppointment(appointmentInput: AppointmentFormInput) {
    try {
      const appointment = {
        "professional_id": appointmentInput.professional,
        "customer_id": appointmentInput.customer,
        "service_id": appointmentInput.service,
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

  async function getProfessionals() {
    const response = await api.get(
      "/auth/user/admin",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      }
    );

    const professionals = response.data ? response.data : [];

    console.log(professionals);

    return professionals.map(({ id, first_name, last_name }: { id: string; first_name: string; last_name: string }) => ({
      label: `${first_name} ${last_name}`,
      value: id! 
    }));
  }

  return (
    <AppointmentContext.Provider value={{ appointment, professionals, createAppointment }}>
      { children }
    </AppointmentContext.Provider>
  )
}