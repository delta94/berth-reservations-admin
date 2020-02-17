import React from 'react';

import styles from './offerPage.module.scss';

const HarborsPage: React.SFC = ({ children }) => {
  return <div className={styles.offerPage}>{children}</div>;
};

export default HarborsPage;
