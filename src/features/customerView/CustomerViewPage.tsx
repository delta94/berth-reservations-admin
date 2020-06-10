import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './customerViewPage.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

interface CustomerViewPageProps {
  children: React.ReactNode;
}

const CustomerViewPage = ({ children }: CustomerViewPageProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.customerViewPage}>
      <PageTitle title={t('customerView.title')} />
      <div className={styles.grid}>{children}</div>
    </div>
  );
};

export default CustomerViewPage;
