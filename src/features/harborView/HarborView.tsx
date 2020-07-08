import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './harborView.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';
import HarborCard from '../../common/harborCard/HarborCard';
import ContactInformationCard from '../../common/contactInformationCard/ContactInformationCard';
import ActionHistoryCard from '../../common/actionHistoryCard/ActionHistoryCard';
import HarborViewTable from './HarborViewTable';
import { Berth, IndividualHarborData, Map, Pier } from './types';

export type HarborViewProps = {
  berths: Berth[];
  harbor: IndividualHarborData;
  maps: Map[];
  piers: Pier[];
  setBerthToEdit: (berthToEdit: string | null) => void;
  setCreatingBerth: (creatingBerth: boolean) => void;
  setCreatingPier: (creatingPier: boolean) => void;
  setEditingHarbor: (editingHarbor: boolean) => void;
  setPierToEdit: (pierToEdit: string | null) => void;
};

const HarborView = ({
  berths,
  harbor,
  maps,
  piers,
  setBerthToEdit,
  setCreatingBerth,
  setCreatingPier,
  setEditingHarbor,
  setPierToEdit,
}: HarborViewProps) => {
  const { t } = useTranslation();

  return (
    <PageContent className={styles.harborView}>
      <PageTitle title={t('harborView.title')} />
      <div className={styles.grid}>
        <HarborCard
          className={styles.fullWidth}
          name={harbor.name || ''}
          imageUrl={harbor.imageFile}
          maps={maps}
          servicemapId={harbor.servicemapId || ''}
          streetAddress={harbor.streetAddress}
          zipCode={harbor.zipCode}
          municipality={harbor.municipality}
          properties={{
            electricity: harbor.electricity,
            gate: harbor.gate,
            lighting: harbor.lighting,
            maxWidth: harbor.maxWidth || 0,
            numberOfPlaces: harbor.numberOfPlaces || 0,
            numberOfFreePlaces: harbor.numberOfFreePlaces || 0,
            queue: harbor.numberOfPlaces || 0,
            wasteCollection: harbor.wasteCollection,
            water: harbor.water,
          }}
          editHarbor={() => setEditingHarbor(true)}
        />
        <ContactInformationCard
          name={harbor.name}
          streetAddress={harbor.streetAddress}
          municipality={harbor.municipality}
          zipCode={harbor.zipCode}
        />
        <ActionHistoryCard />
      </div>

      <HarborViewTable
        berths={berths}
        piers={piers}
        onAddPier={() => setCreatingPier(true)}
        onAddBerth={() => setCreatingBerth(true)}
        onEditBerth={(berth) => setBerthToEdit(berth.id)}
        onEditPier={(pier) => setPierToEdit(pier.id)}
      />
    </PageContent>
  );
};

export default HarborView;
