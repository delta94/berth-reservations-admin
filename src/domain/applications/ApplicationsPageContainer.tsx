import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { Notification } from 'hds-react';

import ApplicationsPage from './ApplicationsPage';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import InternalLink from '../../common/internalLink/InternalLink';
import ApplicationDetails from '../cards/applicationDetails/ApplicationDetails';
import {
  BERTH_APPLICATIONS,
  BERTH_APPLICATIONSVariables as BERTH_APPLICATIONS_VARS,
} from './__generated__/BERTH_APPLICATIONS';
import { getBerthApplicationData, ApplicationData } from './utils';
import { formatDate } from '../../common/utils/format';
import Chip from '../../common/chip/Chip';
import TableFilters from '../../common/tableFilters/TableFilters';
import { APPLICATION_STATUS } from '../../common/utils/consonants';
import { BERTH_APPLICATIONS_QUERY } from './queries';
import { useDeleteBerthApplication } from '../mutations/deleteBerthApplication';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';
import Pagination from '../../common/pagination/Pagination';
import { usePagination } from '../../common/utils/usePagination';

export interface TableData {
  id: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  berths?: string;
  boats?: string;
  group?: string;
  invoice?: string;
  name: string;
  startDate?: string;
}

type ColumnType = Column<ApplicationData> & { accessor: keyof ApplicationData };

const ApplicationsPageContainer: React.SFC = () => {
  const { t, i18n } = useTranslation();
  const [onlySwitchApps, setOnlySwitchApps] = useState<boolean>();

  const { cursor, pageSize, pageIndex, getPageCount, goToPage } = usePagination();

  const { loading, error, data } = useQuery<BERTH_APPLICATIONS, BERTH_APPLICATIONS_VARS>(BERTH_APPLICATIONS_QUERY, {
    variables: {
      first: pageSize,
      after: cursor,
      switchApplications: onlySwitchApps,
    },
  });

  const [deleteDraftedApplication, { loading: isDeleting }] = useDeleteBerthApplication();

  if (error)
    return (
      <Notification labelText={t('common.notification.error.label')} type="error">
        {t('common.notification.error.description')}
      </Notification>
    );

  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/applications/${cell.row.original.id}`}>
          {cell.value
            ? t('applications.applicationType.switchApplication')
            : t('applications.applicationType.newApplication')}
        </InternalLink>
      ),
      Header: t('applications.tableHeaders.applicationType') || '',
      accessor: 'isSwitch',
      sortType: 'basic',
      filter: 'exact',
      width: COLUMN_WIDTH.M,
    },
    {
      Cell: ({ cell }) => formatDate(cell.value, i18n.language),
      Header: t('applications.tableHeaders.pvm') || '',
      accessor: 'createdAt',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('applications.tableHeaders.queue') || '',
      accessor: 'queue',
      width: COLUMN_WIDTH.XS,
    },
    {
      Header: t('applications.tableHeaders.municipality') || '',
      accessor: 'municipality',
      width: COLUMN_WIDTH.S,
    },
    {
      Cell: ({ cell: { value } }) => (
        <Chip
          color={APPLICATION_STATUS[value as ApplicationStatus].color}
          label={t(APPLICATION_STATUS[value as ApplicationStatus].label)}
        />
      ),
      Header: t('applications.tableHeaders.status') || '',
      accessor: 'status',
      width: COLUMN_WIDTH.M,
    },
    {
      Cell: ({ cell }) =>
        cell.value && (
          <InternalLink to={`/harbors/${cell.value.harborId}`}>
            {[cell.value.harborName, cell.value.pierIdentifier, cell.value.berthNum].filter(Boolean).join(' ')}
          </InternalLink>
        ),
      Header: t('applications.tableHeaders.lease') || '',
      accessor: 'lease',
      width: COLUMN_WIDTH.XL,
    },
  ];

  const handleDeleteLease = async (id: string) => {
    await deleteDraftedApplication({
      variables: {
        input: {
          id,
        },
      },
    });
  };

  const tableData = getBerthApplicationData(data);

  return (
    <ApplicationsPage>
      <Table
        data={tableData}
        loading={loading || isDeleting}
        columns={columns}
        renderSubComponent={(row) => <ApplicationDetails {...row.original} handleDeleteLease={handleDeleteLease} />}
        renderMainHeader={() => {
          const filters = [
            {
              value: true,
              label: t('applications.tableHeaders.switchFilter'),
            },
            {
              value: false,
              label: t('applications.tableHeaders.newApplicationFilter'),
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
        renderEmptyStateRow={() => t('common.notification.noData.description')}
        canSelectRows
      />
      <Pagination
        forcePage={pageIndex}
        pageCount={getPageCount(data?.berthApplications?.count)}
        onPageChange={({ selected }) => goToPage(selected)}
      />
    </ApplicationsPage>
  );
};

export default ApplicationsPageContainer;
