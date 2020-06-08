import React from 'react';
import { useTranslation } from 'react-i18next';

import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import InternalLink from '../../common/internalLink/InternalLink';
import CustomerDetails from './customerDetails/CustomerDetails';
import { OrganizationType } from '../../@types/__generated__/globalTypes';
import Pagination, { PaginationProps } from '../../common/pagination/Pagination';
import CustomerListTableTools, { CustomerListTableToolsProps } from './tableTools/CustomerListTableTools';
import { MessageFormValues, CustomerData } from './types';
import { getSelectedRowIds } from '../../common/utils/getSelectedRowIds';

export enum SearchBy {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  ADDRESS = 'address',
}

type ColumnType = Column<CustomerData>;

export interface CustomerListComponentProps {
  loading: boolean;
  data: CustomerData[];
  pagination: PaginationProps;
  tableTools: Omit<CustomerListTableToolsProps<SearchBy>, 'selectedRowsCount' | 'clearSelectedRows'>;
  onSortedColChange(sortBy: { id: string; desc?: boolean } | undefined): void;
  handleSendMessage(customerIds: string[], message: MessageFormValues): void;
}

const CustomerListComponent = ({
  loading,
  data,
  pagination,
  tableTools,
  onSortedColChange,
  handleSendMessage,
}: CustomerListComponentProps) => {
  const { t } = useTranslation();
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
        return value ? t([`common.organizationTypes.${value as OrganizationType}`]) : t([`common.privateCustomer`]);
      },
      Header: t('customerList.tableHeaders.group') || '',
      accessor: 'organizationType',
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
      accessor: 'berthsColumnData',
      disableSortBy: true,
      width: COLUMN_WIDTH.L,
    },
    {
      Header: t('customerList.tableHeaders.invoice') || '',
      accessor: 'billsColumnData',
      disableSortBy: true,
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('customerList.tableHeaders.boats') || '',
      accessor: 'boatsColumnData',
      disableSortBy: true,
      width: COLUMN_WIDTH.XS,
    },
  ];

  return (
    <Table
      data={data}
      loading={loading}
      columns={columns}
      renderSubComponent={(row) => {
        return (
          <CustomerDetails
            name={row.original.name}
            address={row.original.address}
            postalCode={row.original.postalCode}
            city={row.original.city}
            phone={row.original.phone}
            email={row.original.email}
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
  );
};

export default CustomerListComponent;
