import React from 'react';

import styles from './harborsPage.module.scss';

const HarborsPage: React.SFC = ({ children }) => {
  return <div className={styles.harborsPage}>{children}</div>;
};

export default HarborsPage;
