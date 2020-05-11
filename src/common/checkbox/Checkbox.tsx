import React from 'react';
import classNames from 'classnames';

import { ReactComponent as Check } from './assets/check.svg';
import styles from './checkbox.module.scss';

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  label?: string;
  size?: 'small' | 'medium' | 'large';
};

const Checkbox: React.SFC<CheckboxProps> = ({
  checked,
  defaultChecked,
  disabled,
  onChange,
  label,
  size = 'medium',
  readOnly,
  id,
}) => {
  return (
    <label>
      <span
        className={classNames(styles.checkbox, styles[size], {
          [styles.checked]: checked,
          [styles.disabled]: disabled,
          [styles.readOnly]: readOnly,
        })}
      >
        {checked && <Check className={styles.check} />}
        <input
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          className={styles.input}
          type="checkbox"
          readOnly={readOnly}
        />
      </span>
      {label && (
        <span
          className={classNames(styles.label, {
            [styles.disabled]: disabled,
            [styles.readOnly]: readOnly,
          })}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
