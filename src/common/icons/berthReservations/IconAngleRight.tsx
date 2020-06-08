import React from 'react';
import classNames from 'classnames';

import { IconProps } from '../Icon.interface';
import styles from '../icon.module.scss';

export default ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 199.404 199.404"
    className={classNames(styles.icon, styles[size], className)}
    {...rest}
  >
    <g>
      <polygon points="63.993,199.404 163.695,99.702 63.993,0 35.709,28.285 107.127,99.702 35.709,171.119  " />
    </g>
  </svg>
);
