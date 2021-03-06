import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import classNames from 'classnames';

import styles from './internalNavLink.module.scss';

export type InternalNavLinkProps = {
  color?: 'standard' | 'brand' | 'critical' | 'secondary';
  icon?: JSX.Element;
  className?: string;
} & NavLinkProps;

const InternalNavLink = ({ children, color = 'standard', icon, className, ...props }: InternalNavLinkProps) => {
  return (
    <NavLink {...props} activeClassName={styles.isActive} className={classNames(styles.internalNavLink, styles[color])}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.label}>{children}</div>
    </NavLink>
  );
};

export default InternalNavLink;
