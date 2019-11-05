import React from 'react';
import classNames from 'classnames';

import styles from './header.module.scss';

interface Props {
  brand?: React.ReactNode;
  navLinks?: React.ReactNode;
  className?: string;
}

const Header = ({ brand, className }: Props) => (
  <header className={classNames(styles.header, className)}>{brand}</header>
);

export default Header;
