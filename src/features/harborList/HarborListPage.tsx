import React from 'react';
import { useTranslation } from 'react-i18next';

import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import HarborDetails from './harborDetails/HarborDetails';
import InternalLink from '../../common/internalLink/InternalLink';
import styles from './harborListPage.module.scss';
import Icon from '../../common/icons/Icon';
import GlobalSearchTableTools from '../../common/tableTools/globalSearchTableTools/GlobalSearchTableTools';
import Pagination from '../../common/pagination/Pagination';
import PageTitle from '../../common/pageTitle/PageTitle';
import { HarborData } from './types';

type ColumnType = Column<HarborData> & { accessor: keyof HarborData };

export interface HarborListPageProps {
  data: Array<HarborData>;
  loading?: boolean;
}

const HarborListPage = ({ data, loading }: HarborListPageProps) => {
  const { t } = useTranslation();

  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => <InternalLink to={`/harbors/${cell.row.original.id}`}>{cell.value}</InternalLink>,
      Header: t('harborList.tableHeaders.harbor') || '',
      accessor: 'name',
      width: COLUMN_WIDTH.XL,
    },
    {
      Header: t('harborList.tableHeaders.places') || '',
      accessor: 'numberOfPlaces',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('harborList.tableHeaders.freePlaces') || '',
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
    <div className={styles.harborListPage}>
      <PageTitle title={t('harborList.title')} />
      <Table
        data={data}
        loading={loading}
        columns={columns}
        renderTableToolsTop={(_, setters) => <GlobalSearchTableTools handleGlobalFilter={setters.setGlobalFilter} />}
        renderSubComponent={(row) => <HarborDetails {...row.original} />}
        renderMainHeader={() => t('harborList.tableHeaders.mainHeader')}
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

export default HarborListPage;
