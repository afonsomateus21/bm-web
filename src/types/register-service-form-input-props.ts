import { CategoryEnum } from "./category-types";

export interface RegisterServiceFormInputProps {
  title: string;
  description: string;
  duration: number;
  price: number;
  category: CategoryEnum;
  professionalId: string;
  servicePhoto?: File;
}
