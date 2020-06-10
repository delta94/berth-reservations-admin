import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './harborViewPage.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

interface HarborViewPageProps {
  children: React.ReactNode;
}

const HarborViewPage = ({ children }: HarborViewPageProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.harborViewPage}>
      <PageTitle title={t('harborView.title')} />
      {children}
    </div>
  );
};

export default HarborViewPage;
