import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './customerListPage.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import { CustomerData, MessageFormValues } from './types';
import Pagination, { PaginationProps } from '../../common/pagination/Pagination';
import CustomerListTableTools, { CustomerListTableToolsProps } from './tableTools/CustomerListTableTools';
import InternalLink from '../../common/internalLink/InternalLink';
import { OrganizationType } from '../../@types/__generated__/globalTypes';
import { formatDate } from '../../common/utils/format';
import CustomerDetails from './customerDetails/CustomerDetails';
import { getSelectedRowIds } from '../../common/utils/getSelectedRowIds';

export enum SearchBy {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  ADDRESS = 'address',
}

type ColumnType = Column<CustomerData>;

export interface CustomerListPageProps {
  loading: boolean;
  data: CustomerData[];
  pagination: PaginationProps;
  tableTools: Omit<CustomerListTableToolsProps<SearchBy>, 'selectedRowsCount' | 'clearSelectedRows'>;
  onSortedColChange(sortBy: { id: string; desc?: boolean } | undefined): void;
  handleSendMessage(customerIds: string[], message: MessageFormValues): void;
}

const CustomerListPage = ({
  loading,
  data,
  pagination,
  tableTools,
  onSortedColChange,
  handleSendMessage,
}: CustomerListPageProps) => {
  const { t, i18n } = useTranslation();
  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => <InternalLink to={`/customers/${cell.row.original.id}`}>{cell.value}</InternalLink>,
      Header: t('customerList.tableHeaders.name') || '',
      accessor: 'name',
      sortType: 'toString',
      width: COLUMN_WIDTH.M,
    },
    {
      Cell: ({ cell }) => {
        const { value } = cell;
        return value?.organizationType
          ? t([`common.organizationTypes.${value.organizationType as OrganizationType}`])
          : t([`common.privateCustomer`]);
      },
      Header: t('customerList.tableHeaders.group') || '',
      accessor: 'organization',
      disableSortBy: true,
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('customerList.tableHeaders.municipality') || '',
      accessor: 'city',
      disableSortBy: true,
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('customerList.tableHeaders.berths') || '',
      id: 'berths',
      accessor: ({ berthLeases }) => berthLeases.map((berthLease) => berthLease.title).join(', '),
      disableSortBy: true,
      width: COLUMN_WIDTH.L,
    },
    {
      Header: t('customerList.tableHeaders.applications') || '',
      id: 'applications',
      accessor: ({ applications }) =>
        applications.map((application) => formatDate(application.createdAt, i18n.language)).join(' + '),
      disableSortBy: true,
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('customerList.tableHeaders.invoice') || '',
      accessor: 'billsColumnData',
      disableSortBy: true,
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('customerList.tableHeaders.boats') || '',
      id: 'boats',
      accessor: ({ boats }) => boats.length,
      disableSortBy: true,
      width: COLUMN_WIDTH.XS,
    },
  ];
  return (
    <div className={styles.customerListPage}>
      <PageTitle title={t('customerList.title')} />
      <Table
        data={data}
        loading={loading}
        columns={columns}
        renderSubComponent={(row) => {
          return (
            <CustomerDetails
              name={row.original.organization ? row.original.organization.name : row.original.name}
              address={row.original.organization ? row.original.organization.address : row.original.address}
              postalCode={row.original.organization ? row.original.organization.postalCode : row.original.postalCode}
              city={row.original.organization ? row.original.organization.city : row.original.city}
              phone={row.original.phone}
              email={row.original.email}
              organizationType={row.original.organization?.organizationType}
              berths={row.original.berthLeases}
              winterStoragePlaces={[]}
              boats={row.original.boats}
              applications={row.original.applications}
              bills={[]}
              comment={row.original.comment}
            />
          );
        }}
        renderMainHeader={() => t('customerList.tableHeaders.mainHeader')}
        renderTableToolsTop={({ selectedRowIds }, { resetSelectedRows }) => {
          const onSendMessage = (message: MessageFormValues) => {
            const selectedCustomerIds = getSelectedRowIds(selectedRowIds);
            handleSendMessage(selectedCustomerIds, message);
          };
          return (
            <CustomerListTableTools
              {...tableTools}
              handleSendMessage={onSendMessage}
              selectedRowsCount={getSelectedRowIds(selectedRowIds).length}
              clearSelectedRows={resetSelectedRows}
            />
          );
        }}
        renderEmptyStateRow={() => t('common.notification.noData.description')}
        renderTableToolsBottom={() => <Pagination {...pagination} />}
        onSortedColChange={onSortedColChange}
        canSelectRows
      />
    </div>
  );
};

export default CustomerListPage;
