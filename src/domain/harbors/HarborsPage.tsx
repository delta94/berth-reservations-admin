import React from 'react';
import { useTranslation } from 'react-i18next';

import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import HarborDetails from './harborDetails/HarborDetails';
import InternalLink from '../../common/internalLink/InternalLink';
import styles from './harborsPage.module.scss';
import Icon from '../../common/icons/Icon';
import { HarborData } from './utils';
import GlobalSearchTableTools from '../../common/tableTools/globalSearchTableTools/GlobalSearchTableTools';
import Pagination from '../../common/pagination/Pagination';
import PageTitle from '../../common/pageTitle/PageTitle';

type ColumnType = Column<HarborData> & { accessor: keyof HarborData };

export interface HarborsPageProps {
  data: Array<HarborData>;
  loading?: boolean;
}

const HarborsPage: React.FC<HarborsPageProps> = ({ data, loading }) => {
  const { t } = useTranslation();

  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => <InternalLink to={`/harbors/${cell.row.original.id}`}>{cell.value}</InternalLink>,
      Header: t('harbors.tableHeaders.harbor') || '',
      accessor: 'name',
      width: COLUMN_WIDTH.XL,
    },
    {
      Header: t('harbors.tableHeaders.places') || '',
      accessor: 'numberOfPlaces',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('harbors.tableHeaders.freePlaces') || '',
      accessor: 'numberOfFreePlaces',
      width: COLUMN_WIDTH.S,
    },
    {
      Cell: ({ cell }) => <Icon outlined shape="IconPlug" color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <Icon outlined shape="IconPlug" />,
      accessor: 'electricity',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => <Icon outlined shape="IconFence" color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <Icon outlined shape="IconFence" />,
      accessor: 'gate',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => <Icon outlined shape="IconStreetLight" color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <Icon outlined shape="IconStreetLight" />,
      accessor: 'lighting',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => <Icon outlined shape="IconWaterTap" color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <Icon outlined shape="IconWaterTap" />,
      accessor: 'water',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => <Icon outlined shape="IconTrash" color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <Icon outlined shape="IconTrash" />,
      accessor: 'wasteCollection',
      width: COLUMN_WIDTH.XS,
    },
  ];

  return (
    <div className={styles.harborsPage}>
      <PageTitle title={t('harbors.title')} />
      <Table
        data={data}
        loading={loading}
        columns={columns}
        renderTableToolsTop={(_, setters) => <GlobalSearchTableTools handleGlobalFilter={setters.setGlobalFilter} />}
        renderSubComponent={(row) => <HarborDetails {...row.original} />}
        renderMainHeader={() => t('harbors.tableHeaders.mainHeader')}
        renderEmptyStateRow={() => t('common.notification.noData.description')}
        renderPaginator={({ pageIndex, pageCount, goToPage }) => (
          <Pagination
            forcePage={pageIndex}
            pageCount={pageCount || 1}
            onPageChange={({ selected }) => goToPage(selected)}
          />
        )}
        canSelectRows
      />
    </div>
  );
};

export default HarborsPage;
