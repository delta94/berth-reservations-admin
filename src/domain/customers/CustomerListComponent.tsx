import React from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';

import Table from '../../common/table/Table';
import InternalLink from '../../common/internalLink/InternalLink';

export interface TableData {
  id: string;
  municipality?: string;
  berths?: string;
  boats?: string;
  minimizeAll?: string;
  group?: string;
  invoice?: string;
  name: string;
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
        <InternalLink to={`/customers/${cell.row.original.id}}`}>
          {cell.value}
        </InternalLink>
      ),
      Header: t('customers.tableHeaders.name'),
      accessor: 'name',
    },
    {
      Header: t('customers.tableHeaders.group'),
      accessor: 'group',
    },
    {
      Header: t('customers.tableHeaders.municipality'),
      accessor: 'municipality',
    },
    {
      Header: t('customers.tableHeaders.berths'),
      accessor: 'berths',
    },
    {
      Header: t('customers.tableHeaders.invoice'),
      accessor: 'invoice',
    },
    {
      Header: t('customers.tableHeaders.boats'),
      accessor: 'boats',
    },
  ];

  return (
    <Table
      data={data}
      columns={columns}
      renderSubComponent={() => <div>placeholder</div>}
      renderMainHeader={() => t('customers.tableHeaders.mainHeader')}
      canSelectRows
    />
  );
};

export default CustomerListComponent;
