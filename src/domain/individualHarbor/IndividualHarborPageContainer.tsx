import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import Table, { Column } from '../../common/table/Table';
import { INDIVIDUAL_HARBOR_QUERY } from './queries';
import { INDIVIDUAL_HARBOR } from './__generated__/INDIVIDUAL_HARBOR';
import { getIndividualHarborData, getBerths, Berth } from './utils/utils';
import IndividualHarborPage from './individualHarborPage/IndividualHarborPage';
import HarborProperties from './harborProperties/HarborProperties';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { formatDimension } from '../../common/utils/format';

const IndividualHarborPageContainer: React.SFC = () => {
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

  type ColumnType = Column<Berth> & {
    accessor: keyof Berth;
  };

  const columns: ColumnType[] = [
    {
      Header: t('individualHarbor.tableHeaders.number') || '',
      accessor: 'number',
    },
    {
      Header: t('individualHarbor.tableHeaders.identifier') || '',
      accessor: 'identifier',
    },
    {
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
      Header: t('individualHarbor.tableHeaders.length') || '',
      accessor: 'length',
    },
    {
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
      Header: t('individualHarbor.tableHeaders.width') || '',
      accessor: 'width',
    },
    {
      Cell: ({ cell }) => t([`common.mooringTypes.${cell.value}`, cell.value]),
      Header: t('individualHarbor.tableHeaders.mooring') || '',
      accessor: 'mooringType',
    },
  ];
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
        renderMainHeader={() => t('individualHarbor.tableHeaders.mainHeader')}
        canSelectRows
      />
    </IndividualHarborPage>
  );
};

export default IndividualHarborPageContainer;
