import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';

import { HARBORS_QUERY } from './harborsQuery';
import PropertyIcon from './propertyIcon/PropertyIcon';
import Table from '../../common/table/Table';
import { getHarborsData, HarborData } from './utils';
import { HARBORS } from './__generated__/HARBORS';

type ColumnType = Column<HarborData> & { accessor: keyof HarborData };

const HarborsContainer: React.FC = () => {
  const { loading, error, data } = useQuery<HARBORS>(HARBORS_QUERY);
  const { t } = useTranslation();
  const columns: ColumnType[] = [
    {
      Header: t('harbors.tableHeaders.harbor'),
      accessor: 'name',
    },
    {
      Header: t('harbors.tableHeaders.places'),
      accessor: 'numberOfPlaces',
    },
    {
      Cell: ({ cell }) => <PropertyIcon name="plug" disabled={!!cell.value} />,
      Header: () => <PropertyIcon name="plug" />,
      accessor: 'electricity',
    },
    {
      Cell: ({ cell }) => <PropertyIcon name="fence" disabled={!!cell.value} />,
      Header: () => <PropertyIcon name="fence" />,
      accessor: 'gate',
    },
    {
      Cell: ({ cell }) => (
        <PropertyIcon name="streetLight" disabled={!!cell.value} />
      ),
      Header: () => <PropertyIcon name="streetLight" />,
      accessor: 'lighting',
    },
    {
      Cell: ({ cell }) => (
        <PropertyIcon name="waterTap" disabled={!!cell.value} />
      ),
      Header: () => <PropertyIcon name="waterTap" />,
      accessor: 'water',
    },
    {
      Cell: ({ cell }) => <PropertyIcon name="trash" disabled={!!cell.value} />,
      Header: () => <PropertyIcon name="trash" />,
      accessor: 'wasteCollection',
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const tableData = getHarborsData(data);

  return (
    <Table
      data={tableData}
      columns={columns}
      renderSubComponent={row => row.index}
      renderMainHeader={() => t('harbors.tableHeaders.mainHeader')}
      canSelectRows
    />
  );
};

export default HarborsContainer;
