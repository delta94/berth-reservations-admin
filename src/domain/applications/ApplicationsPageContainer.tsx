import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';

import ApplicationsPage from './ApplicationsPage';
import Table, { Column } from '../../common/table/Table';
import InternalLink from '../../common/internalLink/InternalLink';
import ApplicationDetails from './applicationDetails/ApplicationDetails';
import LoadingSpinner from '../../common/spinner/LoadingSpinner';
import { BERTH_APPLICATIONS } from './__generated__/BERTH_APPLICATIONS';
import { getBerthApplicationData, ApplicationData } from './utils';
import { formatDate } from '../../common/utils/format';
import Chip, { ChipProps } from '../../common/chip/Chip';
import { BERTH_APPLICATIONS_QUERY } from './queries';
import { ApplicationStatus } from '../../../__generated__/globalTypes';

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

type ApplicationStatusType = {
  [key in ApplicationStatus]: {
    label: string;
    color: ChipProps['color'];
  };
};

const APPLICATION_STATUS: ApplicationStatusType = {
  PENDING: { label: 'applications.status.pending', color: 'yellow' },
  OFFER_GENERATED: {
    label: 'applications.status.offerGenerated',
    color: 'blue',
  },
  OFFER_SENT: { label: 'applications.status.offerSent', color: 'green' },
  HANDLED: { label: 'applications.status.handled', color: 'blue' },
  EXPIRED: { label: 'applications.status.expired', color: 'grey' },
  NO_SUITABLE_BERTHS: { label: 'applications.status.noSuitable', color: 'red' },
  NO_SUITABLE_BERTHS_NOTIFIED: {
    label: 'applications.status.noSuitableNotified',
    color: 'orange',
  },
};

const ApplicationsPageContainer: React.SFC = () => {
  const { t, i18n } = useTranslation();
  const { loading, error, data } = useQuery<BERTH_APPLICATIONS>(
    BERTH_APPLICATIONS_QUERY
  );

  if (error) {
    return <LoadingSpinner isLoading={loading}>error</LoadingSpinner>;
  }

  const getApplicationType = (isSwitch: boolean) =>
    isSwitch
      ? t('applications.applicationType.switchApplication')
      : t('applications.applicationType.newApplication');

  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/applications/${cell.row.original.id}`}>
          {getApplicationType(cell.value)}
        </InternalLink>
      ),
      Header: t('applications.tableHeaders.applicationType') || '',
      accessor: 'isSwitch',
    },
    {
      Header: t('applications.tableHeaders.queue') || '',
      accessor: 'queue',
    },
    {
      Cell: ({ cell }) => formatDate(cell.value, i18n.language),
      Header: t('applications.tableHeaders.pvm') || '',
      accessor: 'createdAt',
    },
    {
      Header: t('applications.tableHeaders.municipality') || '',
      accessor: 'municipality',
    },
    {
      Cell: ({ cell }) =>
        cell.value && (
          <Chip
            color={APPLICATION_STATUS[cell.value].color}
            label={t(APPLICATION_STATUS[cell.value].label)}
          />
        ),
      Header: t('applications.tableHeaders.status') || '',
      accessor: 'status',
    },
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/offers/${cell.value.id}`}>
          {cell.value.address}
        </InternalLink>
      ),
      Header: t('applications.tableHeaders.lease') || '',
      accessor: 'lease',
    },
  ];

  const tableData = getBerthApplicationData(data);

  return (
    <LoadingSpinner isLoading={loading}>
      <ApplicationsPage>
        <Table
          data={tableData}
          columns={columns}
          renderSubComponent={row => (
            <ApplicationDetails
              {...row.original}
              createdAt={formatDate(row.original.createdAt)}
              status={
                row.original.status &&
                t(APPLICATION_STATUS[row.original.status].label)
              }
              applicationType={getApplicationType(row.original.isSwitch)}
            />
          )}
          renderMainHeader={() => t('applications.tableHeaders.mainHeader')}
          canSelectRows
        />
      </ApplicationsPage>
    </LoadingSpinner>
  );
};

export default ApplicationsPageContainer;
