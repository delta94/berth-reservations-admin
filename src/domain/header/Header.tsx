import React from 'react';

import HelsinkiLogo from '../helsinkiLogo/HelsinkiLogo';
import styles from './header.module.scss';

const Header: React.SFC = () => {
  return (
    <header className={styles.header}>
      <HelsinkiLogo color="white" />
    </header>
  );
};

export default Header;
