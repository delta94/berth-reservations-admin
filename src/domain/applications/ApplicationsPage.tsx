import React from 'react';

import styles from './applicationsPage.module.scss';

const ApplicationsPage: React.SFC = ({ children }) => {
  return <div className={styles.applicationsPage}>{children}</div>;
};

export default ApplicationsPage;
