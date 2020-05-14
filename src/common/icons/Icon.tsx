import React from 'react';
import classNames from 'classnames';

import * as Icons from './';
import styles from './icon.module.scss';

export type IconShapes = keyof typeof Icons;

export interface IconProps {
  className?: string;
  outlined?: boolean;
  shape: IconShapes;
  color?: 'standard' | 'disabled' | 'brand' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const Icon: React.SFC<IconProps> = ({ className, shape, outlined, color = 'standard', size = 'medium' }) => {
  const SVGIcon = Icons[shape];

  return (
    <div
      className={classNames(
        styles.icon,
        styles[color],
        styles[size],
        {
          [styles.outlined]: outlined,
        },
        className
      )}
    >
      <SVGIcon />
    </div>
  );
};

export default Icon;
