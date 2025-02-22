import { CustomSelectProps } from "../../types/custom-select-props";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useState } from "react";

export function CustomSelect({ 
  title, errors, icon = null, options, required = false
}: CustomSelectProps) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="w-full max-w-sm flex flex-col">
      <label 
        htmlFor={title.split(' ')[0].toLowerCase()} 
        className="text-tertiary font-bold flex items-center gap-1"
      >
        {title} {required && <span className="text-red-500 text-2xl leading-none">*</span>}
      </label>
        <Listbox value={selected} onChange={ setSelected }>
          <div className="relative">
            <ListboxButton className="w-full h-14 bg-white border-2 border-secondary rounded-4xl px-4 flex justify-between items-center">
              {
                icon ?? null
              }
              <span>
                { selected.label }
              </span>
              <ArrowDropDownIcon htmlColor="black" fontSize="medium" />
            </ListboxButton>

            <ListboxOptions className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {options.map((option) => (
                <ListboxOption 
                  key={option.value} 
                  value={option} 
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  {option.label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      <p className="text-red-500"> {errors} </p>
    </div>
  );
}

