export interface Service {
  id?: string;
  active?: boolean;
  title?: string;
  description?: string;
  category?: string;
  professionalId?: string;
  duration?: number;
  price?: number;
  photo?: File;
}