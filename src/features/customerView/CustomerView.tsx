import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './customerView.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';

interface CustomerViewProps {
  children: React.ReactNode;
}

const CustomerView = ({ children }: CustomerViewProps) => {
  const { t } = useTranslation();
  return (
    <PageContent>
      <PageTitle title={t('customerView.title')} />
      <div className={styles.grid}>{children}</div>
    </PageContent>
  );
};

export default CustomerView;
