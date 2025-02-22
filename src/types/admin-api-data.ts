import { CategoryEnum } from "./category-types";
import { UserType } from "./user-types";

export interface ApiAdmin {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo: string;
  type: UserType;
  google_sub: string;
  category: CategoryEnum;
}