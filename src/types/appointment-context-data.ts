import { Appointment } from "./appointment";
import { AppointmentFormInput } from "./appointment-form-input";

export interface AppointmentContextData {
  appointment: Appointment | undefined | null;
  professionals: { label: string, value: string }[];
  customers: { label: string, value: string }[];
  loading: boolean;
  createAppointment: (appointmentInput: AppointmentFormInput) => Promise<Appointment | undefined>;
  updateAppointment: (id: string, appointmentInput: AppointmentFormInput) => Promise<Appointment | undefined>;
  getServicesByProfessional: (professional_id: string) => Promise<{ label: string, value: string }[]>;
  getAvailableHoursByProfessionalAndDate: (professional_id: string, date: string) => Promise<number[]>;
  getService: (id: string) => Promise<Appointment>;
  listAppointmentsByCustomer: () => Promise<Appointment[]>;
  listAppointmentsByCustomerAndDate: (date: string) => Promise<Appointment[]>;
  createReservation: (appointmentInput: AppointmentFormInput) => Promise<Appointment | undefined>;
}