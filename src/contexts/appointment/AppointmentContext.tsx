import { createContext } from "react";
import { AppointmentContextData } from "../../types";

export const AppointmentContext = createContext<AppointmentContextData>(
  {} as AppointmentContextData
);