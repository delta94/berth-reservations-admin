import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './applicationListPage.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

const ApplicationListPage: React.SFC = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.applicationListPage}>
      <PageTitle title={t('applications.title')} />
      {children}
    </div>
  );
};

export default ApplicationListPage;
