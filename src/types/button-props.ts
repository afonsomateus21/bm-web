import { AriaAttributes, ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps extends 
DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AriaAttributes  {
	title?: string;
	icon?: ReactNode | string;
	format?: string;
}