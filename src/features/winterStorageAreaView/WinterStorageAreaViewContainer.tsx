import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';

import { INDIVIDUAL_WINTER_STORAGE_AREA_QUERY } from './queries';
import { INDIVIDUAL_WINTER_STORAGE_AREA } from './__generated__/INDIVIDUAL_WINTER_STORAGE_AREA';
import { getIndividualWinterStorageArea, getCustomers } from './utils';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import WinterStorageAreaView from './WinterStorageAreaView';
import WinterStorageAreaCard from '../../common/winterStorageAreaCard/WinterStorageAreaCard';
import styles from './winterStorageAreaView.module.scss';
import WinterStorageAreaViewTable from './WinterStorageAreaViewTable';
import ContactInformationCard from '../../common/contactInformationCard/ContactInformationCard';
import ActionHistoryCard from '../../common/actionHistoryCard/ActionHistoryCard';

const WinterStorageAreaViewContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, data } = useQuery<INDIVIDUAL_WINTER_STORAGE_AREA>(INDIVIDUAL_WINTER_STORAGE_AREA_QUERY, {
    variables: { id },
  });

  const winterStorageArea = getIndividualWinterStorageArea(data);
  const customers = getCustomers(data);

  if (loading || !winterStorageArea) return <LoadingSpinner isLoading={true} />;

  return (
    <WinterStorageAreaView>
      <div className={styles.grid}>
        <WinterStorageAreaCard {...winterStorageArea} className={styles.fullWidth} />
        <ContactInformationCard
          name={winterStorageArea.name}
          streetAddress={winterStorageArea.streetAddress}
          municipality={winterStorageArea.municipality}
          zipCode={winterStorageArea.zipCode}
        />
        <ActionHistoryCard />
        <WinterStorageAreaViewTable data={customers} className={styles.fullWidth} />
      </div>
    </WinterStorageAreaView>
  );
};

export default WinterStorageAreaViewContainer;
