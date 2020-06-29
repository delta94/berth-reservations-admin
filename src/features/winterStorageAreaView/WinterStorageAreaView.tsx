import React from 'react';
import { useTranslation } from 'react-i18next';

import PageContent from '../../common/pageContent/PageContent';
import PageTitle from '../../common/pageTitle/PageTitle';

interface WinterStorageAreaViewPageProps {
  children: React.ReactNode;
}

const WinterStorageAreaView = ({ children }: WinterStorageAreaViewPageProps) => {
  const { t } = useTranslation();
  return (
    <PageContent>
      <PageTitle title={t('winterStorageAreaView.title')} />
      {children}
    </PageContent>
  );
};

export default WinterStorageAreaView;
