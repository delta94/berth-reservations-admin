import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';

import WinterStorageApplicationList from './WinterStorageApplicationList';
import InternalLink from '../../common/internalLink/InternalLink';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import { formatDate } from '../../common/utils/format';
import Chip from '../../common/chip/Chip';
import { APPLICATION_STATUS } from '../../common/utils/consonants';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';
import { getWinterStorageApplicationData, WinterStorageApplication } from './utils';
import { usePagination } from '../../common/utils/usePagination';
import { useBackendSorting } from '../../common/utils/useBackendSorting';
import {
  WINTER_STORAGE_APPLICATIONS,
  WINTER_STORAGE_APPLICATIONSVariables as WINTER_STORAGE_APPLICATIONS_VARS,
} from './__generated__/WINTER_STORAGE_APPLICATIONS';
import { WINTER_STORAGE_APPLICATIONS_QUERY } from './queries';
import Pagination from '../../common/pagination/Pagination';
import TableFilters from '../../common/tableFilters/TableFilters';
import ApplicationDetails from '../../common/applicationDetails/ApplicationDetails';

type ColumnType = Column<WinterStorageApplication>;

const WinterStorageApplicationListContainer = () => {
  const { t, i18n } = useTranslation();
  const { cursor, pageSize, pageIndex, getPageCount, goToPage } = usePagination();

  const { orderBy, handleSortedColChange } = useBackendSorting(() => goToPage(0));
  const { loading, data } = useQuery<WINTER_STORAGE_APPLICATIONS, WINTER_STORAGE_APPLICATIONS_VARS>(
    WINTER_STORAGE_APPLICATIONS_QUERY,
    {
      variables: {
        first: pageSize,
        after: cursor,
        orderBy,
      },
    }
  );
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

  const applications = getWinterStorageApplicationData(data);
  return (
    <WinterStorageApplicationList>
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
          <Pagination
            forcePage={pageIndex}
            pageCount={getPageCount(data?.winterStorageApplications?.count)}
            onPageChange={({ selected }) => goToPage(selected)}
          />
        )}
        renderEmptyStateRow={() => t('common.notification.noData.description')}
        onSortedColChange={handleSortedColChange({ createdAt: 'createdAt' })}
        canSelectRows
      />
    </WinterStorageApplicationList>
  );
};

export default WinterStorageApplicationListContainer;
