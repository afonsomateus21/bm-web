import { UserType } from "./user-types";

export interface AppointmentModalProps {
  isOpen: boolean;
  serviceTitle: string;
  professionalName: string;
  customerName: string;
  date: string | undefined;
  hour: string | undefined
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  userType: UserType;
}