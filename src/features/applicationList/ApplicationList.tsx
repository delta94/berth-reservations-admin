import React from 'react';
import { useTranslation } from 'react-i18next';
import { SortingRule } from 'react-table';

import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';
import ApplicationDetails from '../../common/applicationDetails/ApplicationDetails';
import TableFilters from '../../common/tableFilters/TableFilters';
import Pagination from '../../common/pagination/Pagination';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import { ApplicationData } from './utils';
import { BERTH_APPLICATIONS } from './__generated__/BERTH_APPLICATIONS';
import InternalLink from '../../common/internalLink/InternalLink';
import { formatDate } from '../../common/utils/format';
import Chip from '../../common/chip/Chip';
import { APPLICATION_STATUS } from '../../common/utils/consonants';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';

export interface ApplicationListProps {
  data: BERTH_APPLICATIONS | undefined;
  getPageCount: (connectionsCount: number | null | undefined) => number;
  goToPage: (pageIndex: number) => void;
  handleDeleteLease: (id: string) => Promise<void>;
  onSortedColChange: (sortedCol: SortingRule<ApplicationData> | undefined) => void;
  isDeleting: boolean;
  loading: boolean;
  onlySwitchApps?: boolean;
  pageIndex: number;
  setOnlySwitchApps: (onlySwitchApps?: boolean) => void;
  tableData: ApplicationData[];
}

type ColumnType = Column<ApplicationData>;

const ApplicationList = ({
  data,
  getPageCount,
  goToPage,
  handleDeleteLease,
  onSortedColChange,
  isDeleting,
  loading,
  onlySwitchApps,
  pageIndex,
  setOnlySwitchApps,
  tableData,
}: ApplicationListProps) => {
  const { t, i18n } = useTranslation();

  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/applications/${cell.row.original.id}`}>
          {cell.value
            ? t('applicationList.applicationType.switchApplication')
            : t('applicationList.applicationType.newApplication')}
        </InternalLink>
      ),
      Header: t('applicationList.tableHeaders.applicationType') || '',
      accessor: 'isSwitch',
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
    {
      Cell: ({ cell }) =>
        cell.value && (
          <InternalLink to={`/harbors/${cell.value.harborId}`}>
            {[cell.value.harborName, cell.value.pierIdentifier, cell.value.berthNum].filter(Boolean).join(' ')}
          </InternalLink>
        ),
      Header: t('applicationList.tableHeaders.lease') || '',
      accessor: 'lease',
      disableSortBy: true,
      width: COLUMN_WIDTH.XL,
    },
  ];

  return (
    <PageContent>
      <PageTitle title={t('applicationList.title')} />
      <Table
        data={tableData}
        loading={loading || isDeleting}
        columns={columns}
        renderSubComponent={(row) => <ApplicationDetails {...row.original} handleDeleteLease={handleDeleteLease} />}
        renderMainHeader={() => {
          const filters = [
            {
              value: true,
              label: t('applicationList.tableHeaders.switchFilter'),
            },
            {
              value: false,
              label: t('applicationList.tableHeaders.newApplicationFilter'),
            },
          ];

          return (
            <TableFilters
              filters={filters}
              activeFilters={filters.map((filter) => filter.value).filter((value) => value === onlySwitchApps)}
              handleSetFilter={(filter) => {
                goToPage(0);
                setOnlySwitchApps(filter);
              }}
            />
          );
        }}
        renderTableToolsBottom={() => (
          <Pagination
            forcePage={pageIndex}
            pageCount={getPageCount(data?.berthApplications?.count)}
            onPageChange={({ selected }) => goToPage(selected)}
          />
        )}
        renderEmptyStateRow={() => t('common.notification.noData.description')}
        onSortedColChange={onSortedColChange}
        canSelectRows
      />
    </PageContent>
  );
};

export default ApplicationList;
