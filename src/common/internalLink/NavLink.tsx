import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

import styles from './internalLink.module.scss';

export type Props = {
  underlined?: boolean;
  color?: 'standard' | 'brand' | 'critical' | 'secondary' | 'info';
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'standard' | 'large';
  icon?: JSX.Element;
  className?: string;
} & React.DOMAttributes<HTMLButtonElement> &
  LinkProps;

const NavLink: React.SFC<Props> = ({
  children,
  color = 'standard',
  variant = 'text',
  size = 'standard',
  underlined,
  icon,
  onClick,
  className,
  ...props
}) => {
  return (
    <Link
      {...props}
      className={classNames(styles.internalLink, styles[color], {
        [styles.underlined]: underlined,
      })}
    >
      <span>
        {icon}
        {children}
      </span>
    </Link>
  );
};

export default NavLink;
