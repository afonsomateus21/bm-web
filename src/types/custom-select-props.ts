import { ReactNode } from "react";
export interface CustomSelectProps {
  title: string;
  options: { value: string, label: string }[];
  icon?: ReactNode | string;
  errors?: string | undefined;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}