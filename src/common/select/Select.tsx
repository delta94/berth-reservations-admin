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
  value: string | undefined;
  options: Option[];
  disabled?: boolean;
  onChange(): void;
};

const Select: React.SFC<SelectProps> = ({
  labelText,
  className,
  value,
  options,
  onChange,
  disabled,
}) => {
  const optionsItems = options.map(({ value, label }) => (
    <option key={value} value={value}>
      {label}
    </option>
  ));

  return (
    <label>
      <span className={styles.labelText}>{labelText}</span>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classNames(
          styles.select,
          { [styles.disabled]: disabled },
          className
        )}
      >
        <option>-</option>
        {optionsItems}
      </select>
    </label>
  );
};

export default Select;
