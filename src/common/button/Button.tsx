import React from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

export type Props = {
  color?: 'standard' | 'brand' | 'critical' | 'secondary' | 'info';
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'standard' | 'large';
  icon?: JSX.Element;
} & React.DOMAttributes<HTMLButtonElement>;

const Button: React.SFC<Props> = ({
  children,
  color = 'standard',
  variant = 'contained',
  size = 'standard',
  icon,
  onClick,
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
        icon && children && styles.hasIcon
      )}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
