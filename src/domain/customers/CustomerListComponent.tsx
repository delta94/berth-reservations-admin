import React from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';

import Table, { COLUMN_WIDTH } from '../../common/table/Table';
import InternalLink from '../../common/internalLink/InternalLink';
import CustomerDetails from './customerDetails/CustomerDetails';
import { CUSTOMER_GROUP } from '../types';

export interface TableData {
  address?: string;
  berths?: string;
  boats?: string;
  city?: string;
  customerGroup?: CUSTOMER_GROUP;
  email?: string;
  id: string;
  invoice?: string;
  name: string;
  phone?: string;
  postalCode?: string;
  startDate?: string;
}

type ColumnType = Column<TableData> & { accessor: keyof TableData };
export interface CustomerListComponentProps {
  data: TableData[];
}

const CustomerListComponent = ({ data }: CustomerListComponentProps) => {
  const { t } = useTranslation();
  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/customers/${cell.row.original.id}`}>
          {cell.value}
        </InternalLink>
      ),
      Header: t('customers.tableHeaders.name') || '',
      accessor: 'name',
      width: COLUMN_WIDTH.M,
    },
    {
      Cell: ({ cell }) =>
        t([`common.customerGroups.${cell.value as CUSTOMER_GROUP}`]),
      Header: t('customers.tableHeaders.group') || '',
      accessor: 'customerGroup',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('customers.tableHeaders.municipality') || '',
      accessor: 'city',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('customers.tableHeaders.berths') || '',
      accessor: 'berths',
      width: COLUMN_WIDTH.L,
    },
    {
      Header: t('customers.tableHeaders.invoice') || '',
      accessor: 'invoice',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('customers.tableHeaders.boats') || '',
      accessor: 'boats',
      width: COLUMN_WIDTH.XS,
    },
  ];

  return (
    <Table
      data={data}
      columns={columns}
      renderSubComponent={row => {
        return (
          <CustomerDetails
            name={row.original.name}
            address={row.original.address}
            postalCode={row.original.postalCode}
            city={row.original.city}
            phone={row.original.phone}
            email={row.original.email}
            customerGroup={row.original.customerGroup}
            berths={[]}
            winterStoragePlaces={[]}
            boats={[]}
            applications={[]}
            bills={[]}
            comment=""
          />
        );
      }}
      renderMainHeader={() => t('customers.tableHeaders.mainHeader')}
      canSelectRows
    />
  );
};

export default CustomerListComponent;
