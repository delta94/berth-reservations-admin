import React from 'react';
import { useTranslation } from 'react-i18next';

import PageContent from '../../common/pageContent/PageContent';
import PageTitle from '../../common/pageTitle/PageTitle';

interface WinterStorageApplicationListProps {
  children: React.ReactNode;
}

const WinterStorageApplicationList = ({ children }: WinterStorageApplicationListProps) => {
  const { t } = useTranslation();
  return (
    <PageContent>
      <PageTitle title={t('applicationList.title')} />
      {children}
    </PageContent>
  );
};

export default WinterStorageApplicationList;
