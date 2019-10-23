import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import { HARBORS_QUERY } from './harborsQuery';
import { HARBORS } from './__generated__/HARBORS';
import PropertyIcon from './propertyIcon/PropertyIcon';
import Table from '../../common/table/Table';

const HarborsContainer: React.FC = () => {
  const { loading, error, data } = useQuery<HARBORS>(HARBORS_QUERY);
  const { t } = useTranslation();

  const columns = [
    {
      Header: t('harbors.tableHeaders.harbor'),
      accessor: 'name',
    },
    {
      Header: t('harbors.tableHeaders.places'),
      accessor: 'numberOfPlaces',
    },
    {
      Cell: ({ cell }: { cell: { value: number } }) => (
        <PropertyIcon name="plug" disabled={!!cell.value} />
      ),
      Header: () => <PropertyIcon name="plug" />,
      accessor: 'electricity',
    },
    {
      Cell: ({ cell }: { cell: { value: number } }) => (
        <PropertyIcon name="fence" disabled={!!cell.value} />
      ),
      Header: () => <PropertyIcon name="fence" />,
      accessor: 'gate',
    },
    {
      Cell: ({ cell }: { cell: { value: number } }) => (
        <PropertyIcon name="streetLight" disabled={!!cell.value} />
      ),
      Header: () => <PropertyIcon name="streetLight" />,
      accessor: 'lighting',
    },
    {
      Cell: ({ cell }: { cell: { value: number } }) => (
        <PropertyIcon name="waterTap" disabled={!!cell.value} />
      ),
      Header: () => <PropertyIcon name="waterTap" />,
      accessor: 'water',
    },
    {
      Cell: ({ cell }: { cell: { value: number } }) => (
        <PropertyIcon name="trash" disabled={!!cell.value} />
      ),
      Header: () => <PropertyIcon name="trash" />,
      accessor: 'wasteCollection',
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const tableData =
    data && data.harbors
      ? data.harbors.edges.reduce<object[]>((acc, harbor) => {
          if (harbor && harbor.node && harbor.node.properties) {
            const properties = harbor.node.properties.piers.edges.reduce<{
              electricity: number;
              gate: number;
              lighting: number;
              wasteCollection: number;
              water: number;
            }>(
              (prev, pier) => {
                if (pier && pier.node && pier.node.properties) {
                  return {
                    electricity: pier.node.properties.electricity
                      ? prev.electricity + 1
                      : prev.electricity,
                    gate: pier.node.properties.gate ? prev.gate + 1 : prev.gate,
                    lighting: pier.node.properties.lighting
                      ? prev.lighting + 1
                      : prev.lighting,
                    wasteCollection: pier.node.properties.wasteCollection
                      ? prev.wasteCollection + 1
                      : prev.wasteCollection,
                    water: pier.node.properties.water
                      ? prev.water + 1
                      : prev.water,
                  };
                }
                return prev;
              },
              {
                electricity: 0,
                gate: 0,
                lighting: 0,
                wasteCollection: 0,
                water: 0,
              }
            );

            return [
              ...acc,
              {
                name: harbor.node.properties.name,
                numberOfPlaces: harbor.node.properties.numberOfPlaces || 0,
                ...properties,
              },
            ];
          }
          return acc;
        }, [])
      : [];

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
