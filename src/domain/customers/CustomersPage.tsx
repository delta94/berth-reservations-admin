import React from 'react';

import styles from './customersPage.module.scss';

const CustomersPage: React.SFC = ({ children }) => {
  return <div className={styles.customersPage}>{children}</div>;
};

export default CustomersPage;
