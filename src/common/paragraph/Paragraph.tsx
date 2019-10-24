import React from 'react';
import classNames from 'classnames';

import styles from './paragraph.module.scss';
import Icon from '../icon/Icon';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Paragraph = (props: Props) => {
  return (
    <label
      className={classNames(styles.paragraph, {
        [styles.checked]: props.checked,
      })}
    >
      {props.checked && <Icon name="check" className={styles.check} />}
      <input {...props} className={styles.input} type="checkbox" />
    </label>
  );
};

export default Paragraph;
