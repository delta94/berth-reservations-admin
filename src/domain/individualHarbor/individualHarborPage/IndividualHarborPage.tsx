import React from 'react';

import styles from './individualHarborPage.module.scss';

const IndividualHarborPage: React.SFC = ({ children }) => {
  return <div className={styles.individualHarborPage}>{children}</div>;
};

export default IndividualHarborPage;
