import React from 'react';
import classNames from 'classnames';

import styles from './property.module.scss';

export interface IconProps {
  disabled?: boolean;
  outlined?: boolean;
}

const IconOutline: React.SFC<IconProps> = ({ children, disabled }) => {
  return (
    <div
      className={classNames(styles.icon, styles.outlined, {
        [styles.disabled]: disabled,
      })}
    >
      {children}
    </div>
  );
};

export default IconOutline;
