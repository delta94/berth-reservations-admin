import React from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';

import Table from '../../common/table/Table';

export interface TableData {
  goToDetails?: string;
  group?: string;
  invoice?: string;
  name?: string;
  queue?: string;
  startDate?: string;
  thing?: string;
}

type ColumnType = Column<TableData> & { accessor: keyof TableData };
interface Props {
  data: TableData[];
}

const CustomersListComponent = ({ data }: Props) => {
  const { t } = useTranslation();
  const columns: ColumnType[] = [
    {
      Header: t('customers.tableHeaders.queue'),
      accessor: 'queue',
    },
    {
      Header: t('customers.tableHeaders.name'),
      accessor: 'name',
    },
    {
      Header: t('customers.tableHeaders.startDate'),
      accessor: 'startDate',
    },
    {
      Header: t('customers.tableHeaders.group'),
      accessor: 'group',
    },
    {
      Header: t('customers.tableHeaders.thing'),
      accessor: 'thing',
    },
    {
      Header: t('customers.tableHeaders.invoice'),
      accessor: 'invoice',
    },
    {
      Header: t('customers.tableHeaders.goToDetails'),
      accessor: 'goToDetails',
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

export default CustomersListComponent;