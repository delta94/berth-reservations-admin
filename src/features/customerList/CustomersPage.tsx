import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './customersPage.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

const CustomersPage: React.SFC = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.customersPage}>
      <PageTitle title={t('customers.title')} />
      {children}
    </div>
  );
};

export default CustomersPage;
