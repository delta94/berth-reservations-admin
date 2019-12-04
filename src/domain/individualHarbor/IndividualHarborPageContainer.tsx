import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import Table, { Column } from '../../common/table/Table';
import { INDIVIDUAL_HARBOR_QUERY } from './individualHarborQuery';
import { INDIVIDUAL_HARBOR } from './__generated__/INDIVIDUAL_HARBOR';
import { getIndividualHarborData, getBerths, Berth } from './utils/utils';
import IndividualHarborPage from './individualHarborPage/IndividualHarborPage';
import HarborProperties from './harborProperties/HarborProperties';

const IndividualHarborPageContainer: React.SFC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<INDIVIDUAL_HARBOR>(
    INDIVIDUAL_HARBOR_QUERY,
    { variables: { id } }
  );
  const { t } = useTranslation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const harbor = getIndividualHarborData(data);
  if (!harbor) return <p>No data...</p>;

  type ColumnType = Column<Berth> & {
    accessor: keyof Berth;
  };

  const columns: ColumnType[] = [
    {
      Header: t('individualHarbor.tableHeaders.number'),
      accessor: 'number',
    },
    {
      Header: t('individualHarbor.tableHeaders.identifier'),
      accessor: 'identifier',
    },
    {
      Header: t('individualHarbor.tableHeaders.length'),
      accessor: 'length',
    },
    {
      Header: t('individualHarbor.tableHeaders.width'),
      accessor: 'width',
    },
    {
      Header: t('individualHarbor.tableHeaders.mooring'),
      accessor: 'mooring',
    },
  ];
  const berths = getBerths(data);

  return (
    <IndividualHarborPage>
      <HarborProperties
        name={harbor.name || ''}
        url={harbor.wwwUrl}
        imageUrl={harbor.imageFile || ''}
        address={`${harbor.streetAddress} ${harbor.zipCode} ${harbor.municipality}`}
        properties={{
          electricity: harbor.electricity,
          gate: harbor.gate,
          lighting: harbor.lighting,
          maximumWidth: harbor.maximumWidth || 0,
          numberOfPlaces: harbor.numberOfPlaces || 0,
          wasteCollection: harbor.wasteCollection,
          water: harbor.water,
        }}
      />
      <Table
        data={berths}
        columns={columns}
        renderMainHeader={() => t('harbors.tableHeaders.mainHeader')}
        canSelectRows
      />
    </IndividualHarborPage>
  );
};

export default IndividualHarborPageContainer;
