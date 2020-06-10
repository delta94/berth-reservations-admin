import React from 'react';
import classNames from 'classnames';
import { IconProps } from 'hds-react';

import styles from './iconWrapper.module.scss';

export interface IconWrapperProps {
  className?: string;
  outlined?: boolean;
  icon: (props: IconProps) => React.ReactElement | null;
  color?: 'standard' | 'disabled' | 'brand' | 'secondary' | 'critical';
  size?: IconProps['size'];
}

const IconWrapper: React.FC<IconWrapperProps> = ({ className, icon, outlined, color = 'standard', size = 's' }) => {
  return (
    <div
      className={classNames(
        styles.iconWrapper,
        styles[color],
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
