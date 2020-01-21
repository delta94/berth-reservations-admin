import React from 'react';
import classNames from 'classnames';

import styles from './checkbox.module.scss';
import Icon from '../icon/Icon';

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
        {checked && <Icon name="check" size="small" />}
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
