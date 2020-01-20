import React from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

export type Props = {
  color?: 'standard' | 'brand' | 'critical' | 'secondary' | 'info';
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'standard' | 'large';
  icon?: JSX.Element;
  className?: string;
} & React.DOMAttributes<HTMLButtonElement>;

const Button: React.SFC<Props> = ({
  children,
  color = 'standard',
  variant = 'contained',
  size = 'standard',
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        styles.button,
        styles[color],
        size && styles[size],
        variant && styles[variant],
        icon && children && styles.hasIcon,
        className
      )}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
