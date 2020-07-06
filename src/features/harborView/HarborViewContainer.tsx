import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { INDIVIDUAL_HARBOR_QUERY } from './queries';
import { INDIVIDUAL_HARBOR } from './__generated__/INDIVIDUAL_HARBOR';
import { getIndividualHarborData, getBerths, getPiers, getMaps } from './utils/utils';
import HarborView from './HarborView';
import HarborCard from '../../common/harborCard/HarborCard';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import Modal from '../../common/modal/Modal';
import BerthEditForm from './forms/berthForm/BerthEditForm';
import BerthCreateForm from './forms/berthForm/BerthCreateForm';
import PierCreateForm from './forms/pierForm/PierCreateForm';
import PierEditForm from './forms/pierForm/PierEditForm';
import HarborEditForm from './forms/harborForm/HarborEditForm';
import HarborViewTable from './HarborViewTable';
import ContactInformationCard from '../../common/contactInformationCard/ContactInformationCard';
import ActionHistoryCard from '../../common/actionHistoryCard/ActionHistoryCard';
import styles from './harborView.module.scss';

const HarborViewContainer = () => {
  const [editingHarbor, setEditingHarbor] = useState<boolean>(false);
  const [berthToEdit, setBerthToEdit] = useState<string | null>(null);
  const [creatingBerth, setCreatingBerth] = useState<boolean>(false);
  const [pierToEdit, setPierToEdit] = useState<string | null>(null);
  const [creatingPier, setCreatingPier] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { loading, data } = useQuery<INDIVIDUAL_HARBOR>(INDIVIDUAL_HARBOR_QUERY, { variables: { id } });

  const harbor = getIndividualHarborData(data);

  if (loading || !harbor) return <LoadingSpinner isLoading={true} />;

  const piers = getPiers(data);
  const berths = getBerths(data);
  const maps = getMaps(data);

  return (
    <HarborView>
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
      {berthToEdit && (
        <Modal isOpen={!!berthToEdit} toggleModal={() => setBerthToEdit(null)}>
          <BerthEditForm
            berthId={berthToEdit}
            onCancel={() => setBerthToEdit(null)}
            onDelete={() => setBerthToEdit(null)}
            onSubmit={() => setBerthToEdit(null)}
            refetchQueries={[{ query: INDIVIDUAL_HARBOR_QUERY, variables: { id } }]}
            pierOptions={piers}
          />
        </Modal>
      )}
      <Modal isOpen={creatingBerth} toggleModal={() => setCreatingBerth(false)}>
        <BerthCreateForm
          onCancel={() => setCreatingBerth(false)}
          onSubmit={() => setCreatingBerth(false)}
          refetchQueries={[{ query: INDIVIDUAL_HARBOR_QUERY, variables: { id } }]}
          pierOptions={piers}
        />
      </Modal>
      <Modal isOpen={creatingPier} toggleModal={() => setCreatingPier(false)}>
        <PierCreateForm
          harborId={id}
          onCancel={() => setCreatingPier(false)}
          onSubmit={() => setCreatingPier(false)}
          refetchQueries={[{ query: INDIVIDUAL_HARBOR_QUERY, variables: { id } }]}
        />
      </Modal>
      {pierToEdit && (
        <Modal isOpen={!!pierToEdit} toggleModal={() => setPierToEdit(null)}>
          <PierEditForm
            pierId={pierToEdit}
            onCancel={() => setPierToEdit(null)}
            onDelete={() => setPierToEdit(null)}
            onSubmit={() => setPierToEdit(null)}
            refetchQueries={[{ query: INDIVIDUAL_HARBOR_QUERY, variables: { id } }]}
          />
        </Modal>
      )}
      <Modal isOpen={editingHarbor} toggleModal={() => setEditingHarbor(false)}>
        <HarborEditForm
          harborId={id}
          onCancel={() => setEditingHarbor(false)}
          onSubmit={() => setEditingHarbor(false)}
          refetchQueries={[{ query: INDIVIDUAL_HARBOR_QUERY, variables: { id } }]}
        />
      </Modal>
    </HarborView>
  );
};

export default HarborViewContainer;
