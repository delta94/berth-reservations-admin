import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './individualHarborPage.module.scss';
import PageTitle from '../../../common/pageTitle/PageTitle';

const IndividualHarborPage: React.SFC = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.individualHarborPage}>
      <PageTitle title={t('individualHarbor.title')} />
      {children}
    </div>
  );
};

export default IndividualHarborPage;
