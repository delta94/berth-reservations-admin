import React from 'react';
import classNames from 'classnames';

import styles from './checkbox.module.scss';
import Icon from '../icon/Icon';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.SFC<Props> = props => {
  return (
    <label
      className={classNames(styles.checkbox, {
        [styles.checked]: props.checked,
        [styles.disabled]: props.disabled,
      })}
    >
      {props.checked && <Icon name="check" size="small" />}
      <input {...props} className={styles.input} type="checkbox" />
    </label>
  );
};

export default Checkbox;
