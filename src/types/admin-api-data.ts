import { CategoryEnum } from "./category-types";
import { UserType } from "./user-types";

interface TimeSlot {
  day_of_week: string;
  start_time: string;
  end_time: string;
}
export interface ApiAdmin {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  photo?: string;
  type: UserType;
  google_sub?: string;
  category: CategoryEnum;
  active: boolean
  time_slots: TimeSlot[];
}