import { ReactNode, SelectHTMLAttributes } from "react";

export interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  options: { value: string, label: string }[];
  icon?: ReactNode | string;
  errors?: string | undefined;
}