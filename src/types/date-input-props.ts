import { InputProps } from "./input-props";

export interface DateInputProps extends InputProps {
  dateValue?: Date | null;
  onChangeDate?: (date: Date | null) => void;
}