import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';

import { Lease, UnmarkedWinterStorage } from './types';
import InternalLink from '../../common/internalLink/InternalLink';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import Pagination from '../../common/pagination/Pagination';
import GlobalSearchTableTools from '../../common/tableTools/globalSearchTableTools/GlobalSearchTableTools';
import { formatDate } from '../../common/utils/format';
import CardHeader from '../../common/cardHeader/CardHeader';

type ColumnType = Column<Lease>;

type WinterStorageAreaViewTableProps = UnmarkedWinterStorage & {
  className?: string;
};

const WinterStoragePlaceTable = ({ leases, className }: WinterStorageAreaViewTableProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const columns: ColumnType[] = [
    {
      Cell: ({ cell }: { cell: Cell<Lease> }) => {
        const lease = cell.row.original;
        return <InternalLink to={`/unmarked-ws-notifications/${lease.applicationId}`}>{cell.value}</InternalLink>;
      },
      Header: t('winterStorageAreaView.tableHeaders.customer') as string,
      accessor: ({ customer }) => {
        return `${customer.firstName} ${customer.lastName}`;
      },
      id: 'leases',
      filter: 'text',
    },
    {
      Header: t('winterStorageAreaView.tableHeaders.notified') as string,
      accessor: ({ applicationDate }) => {
        return applicationDate ? formatDate(applicationDate, language) : '-';
      },
      id: 'notified',
      filter: 'text',
      width: COLUMN_WIDTH.XS,
    },
  ];

  return (
    <Table
      className={className}
      data={leases}
      columns={columns}
      canSelectRows
      renderTableToolsTop={(_, setters) => <GlobalSearchTableTools handleGlobalFilter={setters.setGlobalFilter} />}
      renderMainHeader={() => <CardHeader title={t('winterStorageAreaView.unmarkedPlaces').toUpperCase()} />}
      styleMainHeader={false}
      renderPaginator={({ pageIndex, pageCount, goToPage }) => (
        <Pagination
          forcePage={pageIndex}
          pageCount={pageCount || 1}
          onPageChange={({ selected }) => goToPage(selected)}
        />
      )}
    />
  );
};

export default WinterStoragePlaceTable;
