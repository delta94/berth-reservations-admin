import React from 'react';
import { Dropdown } from 'hds-react';
import classNames from 'classnames';

import styles from './select.module.scss';

type OptionValue = string | number;

type Option<T extends OptionValue> = {
  label: string;
  value: T;
};

type ConstructedChangeEvent<T extends OptionValue> = {
  target: {
    id?: string;
    value: T;
  };
};

export type SelectProps<T extends OptionValue = string> = {
  className?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  onChange: (e: ConstructedChangeEvent<T>) => void;
  options: Option<T>[];
  required?: boolean;
  value?: T;
};

const Select = <T extends OptionValue = string>({
  className,
  disabled,
  id,
  label,
  onChange,
  options,
  required,
  value,
}: SelectProps<T>) => {
  const selectedOption = options.find((option) => option.value === value);

  const handleChange = (option: Option<T>) => {
    if (!selectedOption || option.value !== selectedOption.value) {
      const event: ConstructedChangeEvent<T> = {
        target: {
          id,
          value: option.value,
        },
      };

      onChange(event);
    }
  };

  return (
    <Dropdown
      className={classNames(styles.select, className)}
      disabled={disabled}
      id={id}
      label={label}
      onChange={(option) => {
        handleChange(option as Option<T>);
      }}
      options={options}
      required={required}
      selectedOption={selectedOption}
    />
  );
};

export default Select;
