import { CategoryEnum } from "./category-types";
import { TimeSlot } from "./time-slot-type";

export interface Professional {
  id: string;
  firstName: string | undefined;
  lastName: string | undefined;
  photo?: File;
  category: CategoryEnum;
  active: boolean;
  email: string;
  phone: string;
  password: string;
  timeSlots: TimeSlot[];
}