import React from 'react';
import classNames from 'classnames';

import styles from './checkbox.module.scss';
import Icon from '../icon/Icon';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = (props: Props) => {
  return (
    <label
      className={classNames(styles.checkbox, {
        [styles.checked]: props.checked,
      })}
    >
      {props.checked && <Icon name="check" className={styles.check} />}
      <input {...props} className={styles.input} type="checkbox" />
    </label>
  );
};

export default Checkbox;
