import React from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';

import Table, { COLUMN_WIDTH } from '../../common/table/Table';
import InternalLink from '../../common/internalLink/InternalLink';
import CustomerDetails from './customerDetails/CustomerDetails';
import { OrganizationType } from '../../@types/__generated__/globalTypes';

export interface TableData {
  address?: string;
  berths?: string;
  boats?: string;
  city?: string;
  email?: string;
  id: string;
  invoice?: string;
  name: string;
  organizationType?: OrganizationType;
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
      Cell: ({ cell }) => {
        const { value } = cell;
        return value
          ? t([`common.organizationTypes.${value as OrganizationType}`])
          : t([`common.privateCustomer`]);
      },
      Header: t('customers.tableHeaders.group') || '',
      accessor: 'organizationType',
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
