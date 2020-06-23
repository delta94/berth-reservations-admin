import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './customerView.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

interface CustomerViewProps {
  children: React.ReactNode;
}

const CustomerView = ({ children }: CustomerViewProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.customerView}>
      <PageTitle title={t('customerView.title')} />
      <div className={styles.grid}>{children}</div>
    </div>
  );
};

export default CustomerView;
