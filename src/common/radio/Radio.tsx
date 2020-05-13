import React from 'react';
import classNames from 'classnames';

import styles from './radio.module.scss';

export type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string;
  size?: 'small' | 'medium' | 'large';
};

const Radio: React.SFC<RadioProps> = ({ checked, disabled, onChange, label, size = 'medium', readOnly }) => {
  return (
    <label>
      <span
        className={classNames(styles.radio, styles[size], {
          [styles.checked]: checked,
          [styles.disabled]: disabled,
          [styles.readOnly]: readOnly,
        })}
      >
        <input checked={checked} onChange={onChange} className={styles.input} type="radio" readOnly={readOnly} />
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

export default Radio;
