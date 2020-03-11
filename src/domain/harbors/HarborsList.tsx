import React from 'react';
import { useTranslation } from 'react-i18next';

import Table, { Column } from '../../common/table/Table';
import HarborDetails from './harborDetails/HarborDetails';
import InternalLink from '../../common/internalLink/InternalLink';
import styles from './harborsPage.module.scss';
import Icon from '../../common/icons/Icon';
import { HarborData } from './utils';

export interface IconProps {
  disabled?: boolean;
  outlined?: boolean;
  width?: string;
  height?: string;
  size?: 'small' | 'standard' | 'large';
  color?: 'standard' | 'brand' | 'critical' | 'secondary' | 'info';
}

type ColumnType = Column<HarborData> & { accessor: keyof HarborData };

export interface HarborsPageProps {
  data?: Array<HarborData>;
}

const HarborsList: React.FC<HarborsPageProps> = ({ data = [] }) => {
  const { t } = useTranslation();

  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/harbors/${cell.row.original.id}}`}>
          {cell.value}
        </InternalLink>
      ),
      Header: t('harbors.tableHeaders.harbor') || '',
      accessor: 'name',
    },
    {
      Header: t('harbors.tableHeaders.places') || '',
      accessor: 'numberOfPlaces',
    },
    {
      Cell: ({ cell }) => (
        <Icon
          outlined
          shape="IconPlug"
          color={!cell.value ? 'disabled' : 'standard'}
        />
      ),
      Header: () => <Icon outlined shape="IconPlug" />,
      accessor: 'electricity',
    },
    {
      Cell: ({ cell }) => (
        <Icon
          outlined
          shape="IconFence"
          color={!cell.value ? 'disabled' : 'standard'}
        />
      ),
      Header: () => <Icon outlined shape="IconFence" />,
      accessor: 'gate',
    },
    {
      Cell: ({ cell }) => (
        <Icon
          outlined
          shape="IconStreetLight"
          color={!cell.value ? 'disabled' : 'standard'}
        />
      ),
      Header: () => <Icon outlined shape="IconStreetLight" />,
      accessor: 'lighting',
    },
    {
      Cell: ({ cell }) => (
        <Icon
          outlined
          shape="IconWaterTap"
          color={!cell.value ? 'disabled' : 'standard'}
        />
      ),
      Header: () => <Icon outlined shape="IconWaterTap" />,
      accessor: 'water',
    },
    {
      Cell: ({ cell }) => (
        <Icon
          outlined
          shape="IconTrash"
          color={!cell.value ? 'disabled' : 'standard'}
        />
      ),
      Header: () => <Icon outlined shape="IconTrash" />,
      accessor: 'wasteCollection',
    },
  ];

  return (
    <div className={styles.harborsPage}>
      <Table
        data={data}
        columns={columns}
        renderSubComponent={row => <HarborDetails {...row.original} />}
        renderMainHeader={() => t('harbors.tableHeaders.mainHeader')}
        canSelectRows
      />
    </div>
  );
};

export default HarborsList;
