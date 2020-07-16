import React from 'react';
import { useTranslation } from 'react-i18next';

import PageContent from '../../common/pageContent/PageContent';
import PageTitle from '../../common/pageTitle/PageTitle';
import styles from './winterStorageAreaView.module.scss';
import WinterStorageAreaCard from '../../common/winterStorageAreaCard/WinterStorageAreaCard';
import ContactInformationCard from '../../common/contactInformationCard/ContactInformationCard';
import ActionHistoryCard from '../../common/actionHistoryCard/ActionHistoryCard';
import WinterStorageAreaViewTable from './WinterStorageAreaViewTable';
import { WinterStorageArea, WinterStoragePlace, WinterStorageSection } from './types';

interface WinterStorageAreaViewPageProps {
  winterStorageArea: WinterStorageArea;
  places: WinterStoragePlace[];
  sections: WinterStorageSection[];
}

const WinterStorageAreaView = ({ winterStorageArea, places, sections }: WinterStorageAreaViewPageProps) => {
  const { t } = useTranslation();

  return (
    <PageContent>
      <PageTitle title={t('winterStorageAreaView.title')} />
      <div className={styles.grid}>
        <WinterStorageAreaCard {...winterStorageArea} className={styles.fullWidth} />
        <ContactInformationCard
          name={winterStorageArea.name}
          streetAddress={winterStorageArea.streetAddress}
          municipality={winterStorageArea.municipality}
          zipCode={winterStorageArea.zipCode}
        />
        <ActionHistoryCard />
        <WinterStorageAreaViewTable places={places} sections={sections} className={styles.fullWidth} />
      </div>
    </PageContent>
  );
};

export default WinterStorageAreaView;
