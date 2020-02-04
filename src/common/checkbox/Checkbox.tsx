import React from 'react';
import classNames from 'classnames';

import { ReactComponent as Check } from '../../assets/icons/check.svg';
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
  disabled,
  onChange,
  label,
  size = 'medium',
  readOnly,
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
          checked={checked}
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
