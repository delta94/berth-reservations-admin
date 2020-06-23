import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './harborView.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';

interface HarborViewProps {
  children: React.ReactNode;
}

const HarborView = ({ children }: HarborViewProps) => {
  const { t } = useTranslation();
  return (
    <PageContent className={styles.harborView}>
      <PageTitle title={t('harborView.title')} />
      {children}
    </PageContent>
  );
};

export default HarborView;
