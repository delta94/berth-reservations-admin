import React from 'react';
import { useTranslation } from 'react-i18next';

import PageContent from '../../common/pageContent/PageContent';
import PageTitle from '../../common/pageTitle/PageTitle';
import { SortedCol, useBackendSorting } from '../../common/utils/useBackendSorting';
import InternalLink from '../../common/internalLink/InternalLink';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import { formatDate } from '../../common/utils/format';
import Chip from '../../common/chip/Chip';
import { APPLICATION_STATUS } from '../../common/utils/consonants';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';
import { getWinterStorageApplicationData, WinterStorageApplication } from './utils';
import ApplicationDetails from '../../common/applicationDetails/ApplicationDetails';
import TableFilters from '../../common/tableFilters/TableFilters';
import Pagination from '../../common/pagination/Pagination';

interface WinterStorageApplicationListProps {
  applications: WinterStorageApplication[];
  loading: boolean;
  pageCount: number;
  pageIndex: number;
  goToPage(page: number): void;
  onSortedColChange(sortedCol: SortedCol | undefined): void;
}

type ColumnType = Column<WinterStorageApplication>;

const WinterStorageApplicationList = ({
  applications,
  loading,
  pageCount,
  pageIndex,
  goToPage,
  onSortedColChange,
}: WinterStorageApplicationListProps) => {
  const { t, i18n } = useTranslation();
  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/winter-storage-applications/${cell.value}`}>
          {t('applicationList.applicationType.newApplication')}
        </InternalLink>
      ),
      Header: t('applicationList.tableHeaders.applicationType') || '',
      accessor: 'id',
      filter: 'exact',
      disableSortBy: true,
      width: COLUMN_WIDTH.M,
    },
    {
      Cell: ({ cell }) => formatDate(cell.value, i18n.language),
      Header: t('applicationList.tableHeaders.pvm') || '',
      accessor: 'createdAt',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('applicationList.tableHeaders.queue') || '',
      accessor: 'queue',
      disableSortBy: true,
      width: COLUMN_WIDTH.XS,
    },
    {
      Header: t('applicationList.tableHeaders.municipality') || '',
      accessor: 'municipality',
      disableSortBy: true,
      width: COLUMN_WIDTH.S,
    },
    {
      Cell: ({ cell: { value } }) => (
        <Chip
          color={APPLICATION_STATUS[value as ApplicationStatus].color}
          label={t(APPLICATION_STATUS[value as ApplicationStatus].label)}
        />
      ),
      Header: t('applicationList.tableHeaders.status') || '',
      accessor: 'status',
      disableSortBy: true,
      width: COLUMN_WIDTH.M,
    },
  ];

  return (
    <PageContent>
      <PageTitle title={t('applicationList.winterStorageTitle')} />
      <Table
        columns={columns}
        data={applications}
        loading={loading}
        renderSubComponent={(row) => <ApplicationDetails {...row.original} />}
        renderMainHeader={() => (
          <TableFilters
            filters={[]}
            handleSetFilter={() => {
              /* TODO: Add possibility to filter between new and transfer applications */
            }}
          />
        )}
        renderTableToolsBottom={() => (
          <Pagination forcePage={pageIndex} pageCount={pageCount} onPageChange={({ selected }) => goToPage(selected)} />
        )}
        renderEmptyStateRow={() => t('common.notification.noData.description')}
        onSortedColChange={onSortedColChange}
        canSelectRows
      />
    </PageContent>
  );
};

export default WinterStorageApplicationList;
