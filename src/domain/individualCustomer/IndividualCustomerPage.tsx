import React from 'react';

import styles from './individualCustomerPage.module.scss';

const IndividualCustomerPage: React.SFC = ({ children }) => {
  return <div className={styles.individualCustomerPage}>{children}</div>;
};

export default IndividualCustomerPage;
