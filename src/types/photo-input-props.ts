import { InputHTMLAttributes } from "react";

export interface PhotoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  photoUrl?: string;
  title?: string;
}