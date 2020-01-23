import React from 'react';
import classNames from 'classnames';

import { ReactComponent as Check } from '../../assets/icons/check.svg';
import styles from './checkbox.module.scss';

type CheckboxProps = { label?: string } & React.InputHTMLAttributes<
  HTMLInputElement
>;

const Checkbox: React.SFC<CheckboxProps> = ({
  checked,
  disabled,
  onChange,
  label,
}) => {
  return (
    <label>
      <div
        className={classNames(styles.checkbox, {
          [styles.checked]: checked,
          [styles.disabled]: disabled,
        })}
      >
        {checked && <Check className={styles.check} />}
        <input
          checked={checked}
          onChange={onChange}
          className={styles.input}
          type="checkbox"
        />
      </div>
      <span
        className={classNames(styles.label, { [styles.disabled]: disabled })}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
