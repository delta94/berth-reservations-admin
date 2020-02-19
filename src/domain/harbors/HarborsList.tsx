import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Table, { Column } from '../../common/table/Table';
import { HarborData } from './utils';
import {
  IconFence,
  IconTrash,
  IconWaterTap,
  IconPlug,
  IconStreetLight,
} from '../../common/icons';
import HarborDetails from './harborDetails/HarborDetails';
import InternalLink from '../../common/internalLink/InternalLink';
import styles from './harborsPage.module.scss';
import iconStyles from '../../common/icons/icon.module.scss';

export interface IconProps {
  disabled?: boolean;
  outlined?: boolean;
  width?: string;
  height?: string;
  size?: 'small' | 'standard' | 'large';
  color?: 'standard' | 'brand' | 'critical' | 'secondary' | 'info';
}

const IconOutline: React.SFC<IconProps> = ({ children, disabled }) => {
  return (
    <div
      className={classNames(iconStyles.icon, iconStyles.outlined, {
        [iconStyles.disabled]: disabled,
      })}
    >
      {children}
    </div>
  );
};

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
        <IconOutline disabled={!cell.value}>
          <IconPlug
            className={classNames(iconStyles.icon, iconStyles.outline, {
              [iconStyles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => (
        <IconOutline disabled={false}>
          <IconPlug
            className={classNames(iconStyles.icon, iconStyles.outline)}
          />
        </IconOutline>
      ),
      accessor: 'electricity',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconFence
            className={classNames(iconStyles.icon, iconStyles.outline, {
              [iconStyles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => (
        <IconOutline disabled={false}>
          <IconFence
            className={classNames(iconStyles.icon, iconStyles.outline)}
          />
        </IconOutline>
      ),
      accessor: 'gate',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconStreetLight
            className={classNames(iconStyles.icon, iconStyles.outline, {
              [iconStyles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => (
        <IconOutline disabled={false}>
          <IconStreetLight
            className={classNames(iconStyles.icon, iconStyles.outline)}
          />
        </IconOutline>
      ),
      accessor: 'lighting',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconWaterTap
            className={classNames(iconStyles.icon, iconStyles.outline, {
              [iconStyles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => (
        <IconOutline disabled={false}>
          <IconWaterTap
            className={classNames(iconStyles.icon, iconStyles.outline)}
          />
        </IconOutline>
      ),
      accessor: 'water',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconTrash
            className={classNames(iconStyles.icon, iconStyles.outline, {
              [iconStyles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => (
        <IconOutline disabled={false}>
          <IconTrash
            className={classNames(iconStyles.icon, iconStyles.outline)}
          />
        </IconOutline>
      ),
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
