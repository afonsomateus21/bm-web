import { CategoryEnum } from "./category-types";

export interface Professional {
  id: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  category?: CategoryEnum;
  active?: boolean;
}