import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import Table, { Column } from '../../common/table/Table';
import { INDIVIDUAL_HARBOR_QUERY } from './queries';
import { INDIVIDUAL_HARBOR } from './__generated__/INDIVIDUAL_HARBOR';
import {
  getIndividualHarborData,
  getBerths,
  Berth,
  getPiers,
} from './utils/utils';
import IndividualHarborPage from './individualHarborPage/IndividualHarborPage';
import HarborProperties from './harborProperties/HarborProperties';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { formatDimension } from '../../common/utils/format';
import PierSelectHeader from './pierSelectHeader/PierSelectHeader';
import Text from '../../common/text/Text';
import Modal from '../../common/modal/Modal';
import BerthEditForm from './forms/berthForm/BerthEditForm';
import BerthCreateForm from './forms/berthForm/BerthCreateForm';
import IndividualHarborTableTools from './individualHarborTableTools/IndividualHarborTableTools';

const IndividualHarborPageContainer: React.SFC = () => {
  const [berthToEdit, setBerthToEdit] = useState<string | null>(null);
  const [creatingBerth, setCreatingBerth] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<INDIVIDUAL_HARBOR>(
    INDIVIDUAL_HARBOR_QUERY,
    { variables: { id } }
  );
  const { t, i18n } = useTranslation();

  if (loading) return <LoadingSpinner isLoading={loading} />;
  if (error) return <div>Error</div>;

  const harbor = getIndividualHarborData(data);

  if (!harbor) return <div>No data...</div>;

  const columns: Column<Berth>[] = [
    {
      Header: t('individualHarbor.tableHeaders.number') || '',
      accessor: 'number',
      filter: 'text',
    },
    {
      Header: t('individualHarbor.tableHeaders.identifier') || '',
      accessor: 'identifier',
      filter: 'text',
    },
    {
      Header: t('individualHarbor.tableHeaders.length') || '',
      accessor: ({ length }) => formatDimension(length, i18n.language),
      id: 'length',
      filter: 'text',
    },
    {
      Header: t('individualHarbor.tableHeaders.width') || '',
      accessor: ({ width }) => formatDimension(width, i18n.language),
      id: 'width',
      filter: 'text',
    },
    {
      Header: t('individualHarbor.tableHeaders.mooring') || '',
      accessor: ({ mooringType }) =>
        t([`common.mooringTypes.${mooringType}`, mooringType]),
      id: 'mooringType',
      filter: 'text',
    },
  ];
  const piers = getPiers(data);
  const berths = getBerths(data);

  return (
    <IndividualHarborPage>
      <HarborProperties
        name={harbor.name || ''}
        imageUrl={harbor.imageFile}
        servicemapId={harbor.servicemapId || ''}
        address={`${harbor.streetAddress} ${harbor.zipCode} ${harbor.municipality}`}
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
      />
      <Table
        data={berths}
        columns={columns}
        canSelectRows
        renderTableToolsTop={(_, setters) => (
          <IndividualHarborTableTools
            onAddBerth={() => setCreatingBerth(true)}
            onAddPier={() => {
              /* TODO */
            }}
            handleGlobalFilter={setters.setGlobalFilter}
          />
        )}
        renderSubComponent={row => (
          <button onClick={() => setBerthToEdit(row.original.id)}>
            <Text color="brand">{t('forms.common.edit')}</Text>
          </button>
        )}
        styleMainHeader={false}
        renderMainHeader={props => (
          <PierSelectHeader
            piers={piers}
            selectedPier={piers.find(pier =>
              props.state.filters
                .filter(filter => filter.id === 'identifier')
                .find(filter => filter.value === pier.identifier)
            )}
            onPierSelect={pier => {
              props.setFilter('identifier', pier?.identifier);
            }}
          />
        )}
      />
      {berthToEdit && (
        <Modal>
          <BerthEditForm
            berthId={berthToEdit}
            onCancel={() => setBerthToEdit(null)}
            onDelete={() => setBerthToEdit(null)}
            onSubmit={() => setBerthToEdit(null)}
            refetchQueries={[
              { query: INDIVIDUAL_HARBOR_QUERY, variables: { id } },
            ]}
            pierOptions={piers}
          />
        </Modal>
      )}
      {creatingBerth && (
        <Modal>
          <BerthCreateForm
            onCancel={() => setCreatingBerth(false)}
            onSubmit={() => setCreatingBerth(false)}
            refetchQueries={[
              { query: INDIVIDUAL_HARBOR_QUERY, variables: { id } },
            ]}
            pierOptions={piers}
          />
        </Modal>
      )}
    </IndividualHarborPage>
  );
};

export default IndividualHarborPageContainer;
