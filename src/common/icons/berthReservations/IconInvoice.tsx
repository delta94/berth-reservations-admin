import React from 'react';
import classNames from 'classnames';

import styles from '../icon.module.scss';
import { IconProps } from '../index';

export default ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    className={classNames(styles.icon, styles[size], className)}
    {...rest}
  >
    <path
      d="M11 .5c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11S4.925.5 11 .5zm0 1.792a9.208 9.208 0 100 18.416 9.208 9.208 0 000-18.416zm.682 4.18c1.692 0 2.834 1.113 3.25 2.531l-1.773 1.14c0-1.14-.416-2.057-1.477-2.057-.927 0-1.437.723-1.679 1.724h2.539l-.376 1.32H9.842v.807h2.122l-.39 1.32h-1.57c.228.932.698 1.558 1.678 1.558 1.088 0 1.464-1.001 1.477-2.141l1.773 1.154c-.416 1.404-1.49 2.6-3.25 2.6s-3.089-1.057-3.559-3.17H6.968v-1.321h.994c-.013-.153-.013-.32-.013-.5v-.307h-.98V9.81h1.14c.47-2.197 1.894-3.337 3.573-3.337z"
      fillRule="nonzero"
    />
  </svg>
);
