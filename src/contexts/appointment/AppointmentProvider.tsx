import { useEffect, useState } from "react"
import { AppointmentContext } from "./AppointmentContext"
import { Appointment, AppointmentFormInput, CustomProviderProps, UpdateAppointment } from "../../types"
import { api } from "../../services";
import { useAuth } from "../../hooks";

export const AppointmentProvider = ({ children }: CustomProviderProps) => {
  const [ appointment, setAppointment ] = useState<Appointment | null>();
  const [ professionals, setProfessionals ] = useState<{ label: string; value: string }[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const { accessToken, user } = useAuth();

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
        "customer_id": user?.id,
        "service_id": appointmentInput.service,
        "date": appointmentInput.date.toISOString().split('T')[0],
        "hour": parseInt(appointmentInput.hour),
        "is_notifiable": appointmentInput.isNotifiable
      }
      const response = await api.post(
        "/appointments",
        appointment, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        },
      );
      setAppointment(response.data);
      return response.data;
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
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

    return professionals.map(({ id, first_name, last_name }: { id: string; first_name: string; last_name: string }) => ({
      label: `${first_name} ${last_name}`,
      value: id! 
    }));
  }

  async function getServicesByProfessional(professionalId: string) {
    const response = await api.get(
      "/service/professional",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        params: {
          "professional_id": professionalId
        }
      }
    );

    const services = response.data ? response.data : [];

    return services.map(({ id, title }: { id: string; title: string; }) => ({
      label: title,
      value: id! 
    }));
  }

  async function getAvailableHoursByProfessionalAndDate(professionalId: string, date: string) {
    const response = await api.get(
      "/appointments/date-professional",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        params: {
          "professional_id": professionalId,
          "appointment_date": date
        }
      }
    );

    const availableHoursObject: { hours: number[] } = response.data ? response.data : [];

    return availableHoursObject.hours;
  }

  async function getService(id: string) {
    const response = await api.get(
      `/appointments/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      }
    );

    const service: Appointment = response.data;

    return service;
  }

  async function updateAppointment(id: string, appointmentInput: AppointmentFormInput) {
    try {
      const updateData: UpdateAppointment = {};
      
      if (appointmentInput.professional) {
        updateData.professionalId = appointmentInput.professional;
      }
      
      if (appointmentInput.service) {
        updateData.serviceId = appointmentInput.service;
      }
      
      if (appointmentInput.date) {
        updateData.date = appointmentInput.date.toISOString().split('T')[0];
      }
      
      if (appointmentInput.hour) {
        updateData.hour = parseInt(appointmentInput.hour);
      }
      
      if (appointmentInput.isNotifiable !== undefined) {
        updateData.isNotifiable = appointmentInput.isNotifiable;
      }
  
      const response = await api.put(
        `/appointments/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );
      
      setAppointment(response.data);
      return response.data;
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function listAppointmentsByCustomer() {
    try {
      setLoading(true);
      const response = await api.get(
        "/appointments/customer",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
          params: {
            "customer_id": user?.id
          }
        }
      );
  
      const appointments = response.data ? response.data : [];
  
      return appointments;
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function listAppointmentsByCustomerAndDate(date: string) {
    try {
      setLoading(true);
      const response = await api.get(
        "/appointments/date-customer",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
          params: {
            "customer_id": user?.id,
            "appointment_date": date
          }
        }
      );
  
      const appointments = response.data ? response.data : [];
  
      return appointments;
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppointmentContext.Provider 
      value={{ 
        appointment, 
        professionals,
        loading, 
        createAppointment,
        updateAppointment, 
        getServicesByProfessional,
        getAvailableHoursByProfessionalAndDate,
        getService,
        listAppointmentsByCustomer,
        listAppointmentsByCustomerAndDate
      }}>
      { children }
    </AppointmentContext.Provider>
  )
}