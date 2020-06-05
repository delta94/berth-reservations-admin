import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './harborViewPage.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

const HarborViewPage: React.SFC = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.harborViewPage}>
      <PageTitle title={t('harborView.title')} />
      {children}
    </div>
  );
};

export default HarborViewPage;
