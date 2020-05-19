import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './individualCustomerPage.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

const IndividualCustomerPage: React.SFC = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.individualCustomerPage}>
      <PageTitle title={t('individualCustomer.title')} />
      <div className={styles.grid}>{children}</div>
    </div>
  );
};

export default IndividualCustomerPage;
