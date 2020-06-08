import React from 'react';
import classNames from 'classnames';

import styles from './iconWrapper.module.scss';
import { IconProps } from '../icons';

export interface IconWrapperProps {
  className?: string;
  outlined?: boolean;
  icon: React.FC<IconProps>;
  color?: 'standard' | 'disabled' | 'brand' | 'secondary' | 'critical';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
}

const IconWrapper: React.FC<IconWrapperProps> = ({ className, icon, outlined, color = 'standard', size = 's' }) => {
  return (
    <div
      className={classNames(
        styles.iconWrapper,
        styles[color],
        styles[size],
        {
          [styles.outlined]: outlined,
        },
        className
      )}
    >
      {icon({ size })}
    </div>
  );
};

export default IconWrapper;
