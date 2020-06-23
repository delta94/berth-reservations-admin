import React from 'react';
import { useTranslation } from 'react-i18next';

import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';

interface ApplicationListProps {
  children: React.ReactNode;
}

const ApplicationList = ({ children }: ApplicationListProps) => {
  const { t } = useTranslation();
  return (
    <PageContent>
      <PageTitle title={t('applicationList.title')} />
      {children}
    </PageContent>
  );
};

export default ApplicationList;
