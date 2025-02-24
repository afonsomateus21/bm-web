import { UserType } from "./user-types";

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  type?: UserType;
  phone?: string;
  photo?: File;
  googleSub?: number;
}