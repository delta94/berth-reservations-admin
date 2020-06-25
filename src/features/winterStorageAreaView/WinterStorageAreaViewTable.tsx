import React from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';

import { WinterStorageCustomer } from './types';
import InternalLink from '../../common/internalLink/InternalLink';
import Table, { COLUMN_WIDTH } from '../../common/table/Table';

type ColumnType = Column<WinterStorageCustomer>;
interface WinterStorageAreaViewTableProps {
  data: WinterStorageCustomer[];
  className?: string;
}

const WinterStorageAreaViewTable = ({ data, className }: WinterStorageAreaViewTableProps) => {
  const { t } = useTranslation();
  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => <InternalLink to={`/customers/${cell.row.original.id}`}>{cell.value}</InternalLink>,
      Header: t('winterStorageAreaView.table.tableHeaders.name') || '',
      accessor: 'name',
      width: COLUMN_WIDTH.M,
    },
  ];

  return <Table className={className} data={data} columns={columns} canSelectRows />;
};

export default WinterStorageAreaViewTable;
