import { createContext } from "react";
import { ServiceContextData } from "../../types";

export const ServiceContext = createContext<ServiceContextData>(
  {} as ServiceContextData
);