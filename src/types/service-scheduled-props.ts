import { HTMLAttributes } from "react";

export interface ServiceScheduledProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  photo?: string;
  serviceTitle: string;
  professional: string;
  date: string;
  hour: string;
}