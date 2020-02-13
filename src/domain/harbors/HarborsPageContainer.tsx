import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { HARBORS_QUERY } from './harborsQuery';
import Table, { Column } from '../../common/table/Table';
import { getHarborsData, HarborData } from './utils';
import { HARBORS } from './__generated__/HARBORS';
import HarborDetails from './harborDetails/HarborDetails';
import HarborsPage from './HarborsPage';
import InternalLink from '../../common/internalLink/InternalLink';
import styles from '../../common/icons/icon.module.scss';
import {
  IconExclamationCircle,
  IconPlug,
  IconFence,
  IconStreetLight,
  IconWaterTap,
  IconTrash,
} from '../../common/icons';

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
      className={classNames(styles.icon, styles.outlined, {
        [styles.disabled]: disabled,
      })}
    >
      {children}
    </div>
  );
};

type ColumnType = Column<HarborData> & { accessor: keyof HarborData };

const HarborsContainer: React.FC = () => {
  const { loading, error, data } = useQuery<HARBORS>(HARBORS_QUERY);
  const { t } = useTranslation();
  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/harbors/${cell.row.original.id}}`}>
          {cell.value}
        </InternalLink>
      ),
      Header: t('harbors.tableHeaders.harbor'),
      accessor: 'name',
    },
    {
      Header: t('harbors.tableHeaders.places'),
      accessor: 'numberOfPlaces',
    },
    {
      Cell: ({ cell }) => (
        <div>
          <IconExclamationCircle
            className={classNames(styles.icon, styles.nowrapper, {
              [styles.disabled]: !cell.value,
            })}
          />
        </div>
      ),
      Header: () => (
        <div className={classNames(styles.icon, styles.nowrapper)}>
          <IconExclamationCircle />
        </div>
      ),
      accessor: 'id',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconPlug
            className={classNames(styles.icon, {
              [styles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => (
        <IconOutline>
          <IconPlug className={styles.icon} />
        </IconOutline>
      ),
      accessor: 'electricity',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconFence
            className={classNames(styles.icon, {
              [styles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => (
        <IconOutline>
          <IconFence className={styles.icon} />
        </IconOutline>
      ),
      accessor: 'gate',
    },

    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconStreetLight
            className={classNames(styles.icon, {
              [styles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => (
        <IconOutline>
          <IconStreetLight className={styles.icon} />
        </IconOutline>
      ),
      accessor: 'lighting',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconWaterTap
            className={classNames(styles.icon, {
              [styles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => (
        <IconOutline>
          <IconWaterTap className={styles.icon} />
        </IconOutline>
      ),
      accessor: 'water',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconTrash
            className={classNames(styles.icon, {
              [styles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => (
        <IconOutline>
          <IconTrash className={styles.icon} />
        </IconOutline>
      ),
      accessor: 'wasteCollection',
    },
  ];

  if (error) return <p>Error</p>;

  const tableData = getHarborsData(data);

  return (
    <LoadingSpinner isLoading={loading}>
      <HarborsPage>
        <Table
          data={tableData}
          columns={columns}
          renderSubComponent={row => <HarborDetails {...row.original} />}
          renderMainHeader={() => t('harbors.tableHeaders.mainHeader')}
          canSelectRows
        />
      </HarborsPage>
    </LoadingSpinner>
  );
};

export default HarborsContainer;
