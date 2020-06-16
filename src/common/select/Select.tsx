import React, { ChangeEvent } from 'react';
import { Dropdown } from 'hds-react';

interface Option {
  label: string;
  value: string | number;
}

export type SelectProps = {
  className?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: Option[];
  required?: boolean;
  value: Option['value'] | undefined;
};

const Select = ({ id, labelText, className, value, options, onChange, required, disabled }: SelectProps) => {
  const selectedOption = options.find((option) => option.value === value);
  return (
    <Dropdown
      className={className}
      disabled={disabled}
      id={id}
      label={labelText}
      onChange={(option) => {
        if (!selectedOption || (option as Option).value !== selectedOption.value) {
          const event = {
            target: {
              id,
              value: (option as Option).value,
            },
          };
          onChange(event as ChangeEvent<HTMLSelectElement>);
        }
      }}
      options={options}
      required={required}
      selectedOption={selectedOption}
    />
  );
};

export default Select;
