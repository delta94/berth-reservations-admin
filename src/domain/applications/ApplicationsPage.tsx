import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './applicationsPage.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

const ApplicationsPage: React.SFC = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.applicationsPage}>
      <PageTitle title={t('applications.title')} />
      {children}
    </div>
  );
};

export default ApplicationsPage;
