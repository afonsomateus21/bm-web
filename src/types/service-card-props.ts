import { User } from "./user";
import { Service } from "./service";

export interface ServiceCardProps {
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  user?: User | null;
  service: Service;
  onServiceClick: (service: Service) => void;
}