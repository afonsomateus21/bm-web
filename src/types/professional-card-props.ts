import { Professional } from "./professional";
import { User } from "./user";

export interface ProfessionalCardProps {
  name?: string,
  category?: string,
  imageUrl?: string,
  professional: Professional,
  user?: User | null,
  active?: boolean,
  onProfessionalClick: (professional: Professional) => void;
}