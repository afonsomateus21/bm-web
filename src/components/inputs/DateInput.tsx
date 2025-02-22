import { Ref, forwardRef, useState } from "react";
import { InputProps } from "../../types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Input({ 
  title, icon = null, errors, required = false, ...rest 
}: InputProps, ref: Ref<HTMLInputElement>) {

  const [startDate, setStartDate] = useState<Date | null>();


  return (
    <div className="w-full max-w-sm flex flex-col">
      <label 
        htmlFor={title.split(' ')[0].toLowerCase()} 
        className="text-tertiary font-bold flex items-center gap-1"
      >
        {title} {required && <span className="text-red-500 text-2xl leading-none">*</span>}
      </label>
      <div className="w-full max-w-sm mx-auto relative rounded-4xl md:w-64 bg-white h-14 flex items-center justify-center px-3 border-2 border-secondary">
        <span className="absolute left-4">
          { icon ?? null }
        </span>
        <DatePicker 
          toggleCalendarOnIconClick
          selected={ startDate }
          onChange={(date) => setStartDate(date)}
          {...rest}
          className="w-full text-center outline-none border-none p-4 text-xl placeholder:font-bold placeholder:opacity-40 hide-calendar-icon" 
        />
      </div>

      <p className="text-red-500"> {errors} </p>
    </div>
  );
}

export const DateInput = forwardRef(Input);

