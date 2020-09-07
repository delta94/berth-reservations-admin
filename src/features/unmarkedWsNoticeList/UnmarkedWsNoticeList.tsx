import React from 'react';
import { useTranslation } from 'react-i18next';

import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';

export interface UnmarkedWsNoticeListProps {
  placeholder?: null;
}

const UnmarkedWsNoticeList = (props: UnmarkedWsNoticeListProps) => {
  const { t } = useTranslation();

  return (
    <PageContent>
      <PageTitle title={t('applicationList.unmarkedWsTitle')} />
      <div>TODO</div>
    </PageContent>
  );
};

export default UnmarkedWsNoticeList;
