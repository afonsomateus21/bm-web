import { User } from "./user";

export interface ServiceCardProps {
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  user?: User | null;
}