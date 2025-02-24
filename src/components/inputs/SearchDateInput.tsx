import { DateInputProps } from "../../types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

export function SearchDateInput({ 
  icon = null, errors, dateValue, onChangeDate, ...rest 
}: DateInputProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-sm flex flex-col">
      <div className="w-full max-w-sm mx-auto relative rounded-2xl md:w-64 bg-white h-14 flex items-center justify-center px-3 border-1 border-tertiary">
        <DatePicker 
          toggleCalendarOnIconClick
          selected={ dateValue }
          onChange={ onChangeDate }
          {...rest}
          placeholderText={t('Common.Form.Placeholders.Date')}
          dateFormat="dd/MM/yyyy"
          className="w-full text-center outline-none border-none p-4 text-xl placeholder:font-bold placeholder:opacity-40 hide-calendar-icon" 
        />
        <span className="absolute left-4">
          { icon ?? null }
        </span>
      </div>

      <p className="text-red-500"> {errors} </p>
    </div>
  );
}
