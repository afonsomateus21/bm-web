import { Appointment } from "./appointment";
import { AppointmentFormInput } from "./appointment-form-input";

export interface AppointmentContextData {
  appointment: Appointment | undefined | null;
  createAppointment: (appointmentInput: AppointmentFormInput) => Promise<Appointment | undefined>;
  // removeAppointment: (id: string) => Promise<boolean>;
  // listAppointments: () => Promise<Appointment[]>;
  // listAppointmentsByCustomer: (customerId: string) => Promise<Appointment[]>;
  // listAppointmentsByProfessional: (professionalId: string) => Promise<Appointment[]>;
  // listAppointmentsByDate: (date: string) => Promise<Appointment[]>;
  // listAppointmentsByDateAndProfessional: (date: string, professionalId: string) => Promise<Appointment[]>;
}