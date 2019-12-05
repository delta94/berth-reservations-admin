import React from 'react';

import styles from './header.module.scss';

interface Props {
  children: React.ReactNode;
}

const Header = ({ children }: Props) => (
  <header className={styles.header}>{children}</header>
);

export default Header;
