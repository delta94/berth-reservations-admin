import React from 'react';
import classNames from 'classnames';

import styles from './select.module.scss';

interface Option {
  label: string;
  value: string | number;
}

export type SelectProps = {
  labelText?: string;
  className?: string;
  value: Option['value'] | undefined;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  id?: string;
};

const Select: React.SFC<SelectProps> = ({
  labelText,
  className,
  value,
  options,
  onChange,
  required,
  disabled,
  id,
}) => {
  const optionsItems = options.map(({ value, label }) => (
    <option key={value} value={value}>
      {label}
    </option>
  ));

  return (
    <label className={className}>
      {labelText && <span className={styles.labelText}>{labelText}</span>}
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classNames(styles.select, { [styles.disabled]: disabled })}
      >
        {!required && <option>-</option>}
        {optionsItems}
      </select>
    </label>
  );
};

export default Select;
