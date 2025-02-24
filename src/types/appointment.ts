import { AppointmentCustomer } from "./appointment-customer";
import { AppointmentProfessional } from "./appointment-professional";
import { AppointmentService } from "./appointment-service";

export interface Appointment {
  id?: string;
  professional: AppointmentProfessional;
  customer: AppointmentCustomer;
  service: AppointmentService;
  date: string;
  hour: number;
  isNotifiable: boolean;
}