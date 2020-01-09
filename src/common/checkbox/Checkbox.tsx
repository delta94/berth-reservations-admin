import React from 'react';
import classNames from 'classnames';

import styles from './checkbox.module.scss';
import Icon from '../icon/Icon';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.SFC<Props> = ({ checked, disabled, onChange }) => {
  return (
    <label
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
    </label>
  );
};

export default Checkbox;
