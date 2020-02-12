import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { HARBORS_QUERY } from './harborsQuery';
import Table, { Column } from '../../common/table/Table';
import { getHarborsData, HarborData } from './utils';
import { HARBORS } from './__generated__/HARBORS';
import {
  IconPole,
  IconFence,
  IconTrash,
  IconWaterTap,
} from '../../common/icons';
import HarborDetails from './harborDetails/HarborDetails';
import HarborsPage from './HarborsPage';
import InternalLink from '../../common/internalLink/InternalLink';
import styles from '../../common/icons/icon.module.scss';

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
        <IconOutline disabled={!cell.value}>
          <IconPole
            className={classNames(styles.icon, styles.outline, {
              [styles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => <IconPole className={styles.icon} />,
      accessor: 'electricity',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconFence
            className={classNames(styles.icon, styles.outline, {
              [styles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => <IconPole className={styles.icon} />,
      accessor: 'gate',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconFence
            className={classNames(styles.icon, styles.outline, {
              [styles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => <IconPole className={styles.icon} />,
      accessor: 'lighting',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconFence
            className={classNames(styles.icon, styles.outline, {
              [styles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => <IconWaterTap className={styles.icon} />,
      accessor: 'water',
    },
    {
      Cell: ({ cell }) => (
        <IconOutline disabled={!cell.value}>
          <IconFence
            className={classNames(styles.icon, styles.outline, {
              [styles.disabled]: !cell.value,
            })}
          />
        </IconOutline>
      ),
      Header: () => <IconTrash className={styles.icon} />,
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
