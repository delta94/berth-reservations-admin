import React from 'react';

import styles from './header.module.scss';

export interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => <header className={styles.header}>{children}</header>;

export default Header;
