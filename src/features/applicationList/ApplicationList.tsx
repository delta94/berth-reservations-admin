import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './applicationList.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';

interface ApplicationListProps {
  children: React.ReactNode;
}

const ApplicationList = ({ children }: ApplicationListProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.applicationList}>
      <PageTitle title={t('applicationList.title')} />
      {children}
    </div>
  );
};

export default ApplicationList;
