import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line
import { Column } from 'react-table';

import Table from '../../common/table/Table';
import { INDIVIDUAL_HARBOR_QUERY } from './individualHarborQuery';
import { INDIVIDUAL_HARBOR } from './__generated__/INDIVIDUAL_HARBOR';
import { getIndividualHarborData, getBerths, Berth } from './utils/utils';
import IndividualHarborPage from './individualHarborPage/IndividualHarborPage';

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
      Header: () => 'Paikka',
      accessor: 'number',
    },
    {
      Header: () => 'Laituri',
      accessor: 'identifier',
    },
    {
      Header: () => 'Pituus',
      accessor: 'length',
    },
    {
      Header: () => 'Leveys',
      accessor: 'width',
    },
    {
      Header: () => 'Kiinnitys',
      accessor: 'mooring',
    },
  ];
  const berths = getBerths(data);

  return (
    <IndividualHarborPage>
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
