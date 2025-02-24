import { Appointment } from "./appointment";
import { AppointmentFormInput } from "./appointment-form-input";

export interface AppointmentContextData {
  appointment: Appointment | undefined | null;
  professionals: { label: string, value: string }[];
  loading: boolean;
  createAppointment: (appointmentInput: AppointmentFormInput) => Promise<Appointment | undefined>;
  updateAppointment: (id: string, appointmentInput: AppointmentFormInput) => Promise<Appointment | undefined>;
  getServicesByProfessional: (professional_id: string) => Promise<{ label: string, value: string }[]>;
  getAvailableHoursByProfessionalAndDate: (professional_id: string, date: string) => Promise<number[]>;
  getService: (id: string) => Promise<Appointment>;
  listAppointmentsByCustomer: () => Promise<Appointment[]>;
  listAppointmentsByCustomerAndDate: (date: string) => Promise<Appointment[]>;
  // removeAppointment: (id: string) => Promise<boolean>;
  // listAppointments: () => Promise<Appointment[]>;
  // listAppointmentsByProfessional: (professionalId: string) => Promise<Appointment[]>;
  // listAppointmentsByDate: (date: string) => Promise<Appointment[]>;
  // listAppointmentsByDateAndProfessional: (date: string, professionalId: string) => Promise<Appointment[]>;
}