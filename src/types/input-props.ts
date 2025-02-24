import { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  required?: boolean;
  icon?: ReactNode | string;
  errors?: string | undefined;
}