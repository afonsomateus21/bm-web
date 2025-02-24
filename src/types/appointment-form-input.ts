export interface AppointmentFormInput {
  professional: string;
  customer?: string;
  service: string;
  date: Date;
  hour: string;
  isNotifiable: boolean;
}