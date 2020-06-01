import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './offerPage.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

const HarborsPage: React.SFC = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.offerPage}>
      <PageTitle title={t('offer.title')} />
      {children}
    </div>
  );
};

export default HarborsPage;
