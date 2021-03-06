import React from 'react';
import classNames from 'classnames';

import styles from '../icon.module.scss';
import { IconProps } from '../index';

export default ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 480 480"
    className={classNames(styles.icon, styles[size], className)}
    {...rest}
  >
    <path d="M154.61 313.9l-11.36-11.45-11.36 11.45a341.93 341.93 0 0 0-26.29 30.56c-18.95 25-28.16 45.16-28.16 61.73C77.44 425 84.87 442 98.37 454a68.35 68.35 0 0 0 89.76 0c13.5-12 20.94-29 20.94-47.81 0-16.57-9.21-36.76-28.16-61.73a341.09 341.09 0 0 0-26.3-30.56zm-11.36 124.9c-22.2 0-33.81-16.4-33.81-32.61 0-4.14 2.09-16.54 21.44-42.11 4.29-5.66 8.61-10.88 12.37-15.22 3.76 4.34 8.09 9.56 12.37 15.22 19.36 25.57 21.45 38 21.45 42.11 0 16.21-11.62 32.61-33.82 32.61zM341.91 158.33v-44h66.42v-32H243.49v32h66.42v44h-83.63c-57.36 0-104 45.76-104 102v21h42v-21c0-33.1 27.83-60 62-60h220.26v-42z" />
  </svg>
);
