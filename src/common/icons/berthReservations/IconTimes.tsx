import React from 'react';
import classNames from 'classnames';

import { IconProps } from '../Icon.interface';
import styles from '../icon.module.scss';

export default ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 480 480"
    className={classNames(styles.icon, styles[size], className)}
    {...rest}
  >
    <path d="M374.8 167.6l-30.4-30.4-88.4 88.4-88.4-88.4-30.4 30.4 88.4 88.4-88.4 88.4 30.4 30.4 88.4-88.4 88.4 88.4 30.4-30.4-88.4-88.4z" />
  </svg>
);
