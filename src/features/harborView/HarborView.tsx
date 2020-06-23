import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './harborView.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

interface HarborViewProps {
  children: React.ReactNode;
}

const HarborView = ({ children }: HarborViewProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.harborView}>
      <PageTitle title={t('harborView.title')} />
      {children}
    </div>
  );
};

export default HarborView;
