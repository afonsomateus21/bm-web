import { Professional } from "./professional";

export interface ProfessionalCardProps {
  name?: string,
  category?: string,
  imageUrl?: string,
  professional: Professional,
  onProfessionalClick: (professional: Professional) => void;
}