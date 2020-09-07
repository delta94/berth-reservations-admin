import React from 'react';
import { useTranslation } from 'react-i18next';

import PageContent from '../../common/pageContent/PageContent';
import PageTitle from '../../common/pageTitle/PageTitle';
import styles from './winterStorageAreaView.module.scss';
import WinterStorageAreaCard from '../../common/winterStorageAreaCard/WinterStorageAreaCard';
import ContactInformationCard from '../../common/contactInformationCard/ContactInformationCard';
import ActionHistoryCard from '../../common/actionHistoryCard/ActionHistoryCard';
import WinterStoragePlaceTable from './WinterStoragePlaceTable';
import { MarkedWinterStorage, UnmarkedWinterStorage, WinterStorageArea } from './types';
import UnmarkedWinterStorageLeaseTable from './UnmarkedWinterStorageLeaseTable';

interface WinterStorageAreaViewPageProps {
  winterStorageArea: WinterStorageArea;
  markedWinterStorage?: MarkedWinterStorage;
  unmarkedWinterStorage?: UnmarkedWinterStorage;
}

const WinterStorageAreaView = ({
  winterStorageArea,
  markedWinterStorage,
  unmarkedWinterStorage,
}: WinterStorageAreaViewPageProps) => {
  const { t } = useTranslation();

  return (
    <PageContent>
      <PageTitle title={t('winterStorageAreaView.title')} />
      <div className={styles.grid}>
        <WinterStorageAreaCard {...winterStorageArea} className={styles.fullWidth} />
        <ContactInformationCard />
        <ActionHistoryCard />
        {markedWinterStorage && <WinterStoragePlaceTable {...markedWinterStorage} className={styles.fullWidth} />}
        {unmarkedWinterStorage && (
          <UnmarkedWinterStorageLeaseTable {...unmarkedWinterStorage} className={styles.fullWidth} />
        )}
      </div>
    </PageContent>
  );
};

export default WinterStorageAreaView;
