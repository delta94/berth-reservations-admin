import React from 'react';
import { useTranslation } from 'react-i18next';
import { Notification } from 'hds-react';

import Table, { Column } from '../../common/table/Table';
import styles from './applicationView.module.scss';
import CustomersTableTools, { CustomersTableToolsProps } from './customersTableTools/CustomersTableTools';
import Pagination, { PaginationProps } from '../../common/pagination/Pagination';
import { CustomerData, SearchBy } from './ApplicationView';
import { getCustomerGroupKey } from '../../common/utils/translations';

export interface SimilarCustomersTableProps {
  data: CustomerData[];
  customersTableTools: CustomersTableToolsProps<SearchBy>;
  loadingCustomers?: boolean;
  pagination: PaginationProps;
  onSortedColChange: (sortBy: { id: string; desc?: boolean } | undefined) => void;
  handleLinkCustomer: (customerId: string) => void;
}

type ColumnType = Column<CustomerData> & { accessor: keyof CustomerData };

const SimilarCustomersTable = ({
  customersTableTools,
  loadingCustomers,
  pagination,
  onSortedColChange,
  handleLinkCustomer,
  data,
}: SimilarCustomersTableProps) => {
  const { t } = useTranslation();

  const columns: ColumnType[] = [
    {
      Header: t('applicationView.customersTable.name') || '',
      sortType: 'toString',
      accessor: 'name',
    },
    {
      Cell: ({ cell }) => {
        const { value } = cell;
        const customerGroupKey = getCustomerGroupKey(value);
        return t(customerGroupKey);
      },
      Header: t('customerList.tableHeaders.group') || '',
      disableSortBy: true,
      accessor: 'customerGroup',
    },
    {
      Header: t('applicationView.customersTable.municipality') || '',
      disableSortBy: true,
      accessor: 'city',
    },
    {
      Header: t('applicationView.customersTable.address') || '',
      disableSortBy: true,
      accessor: 'address',
    },
    {
      Cell: ({ cell }) => (
        <div title={cell.value !== null ? cell.value : undefined} className={styles.berthsCell}>
          {cell.value}
        </div>
      ),
      Header: t('applicationView.customersTable.berths') || '',
      disableSortBy: true,
      accessor: 'berths',
    },
  ];

  return (
    <>
      <div className={styles.fullWidth}>
        <Notification labelText={t('applicationView.noCustomerProfileNotification.label')} type="warning">
          {t('applicationView.noCustomerProfileNotification.description')}
        </Notification>
      </div>
      <Table
        className={styles.fullWidth}
        data={data}
        loading={loadingCustomers}
        columns={columns}
        renderMainHeader={() => t('applicationView.customersTable.mainHeader')}
        renderTableToolsTop={({ selectedRows }) => {
          const onLinkCustomer = selectedRows.length ? () => handleLinkCustomer(selectedRows[0].id) : undefined;

          return <CustomersTableTools {...customersTableTools} handleLinkCustomer={onLinkCustomer} />;
        }}
        renderTableToolsBottom={() => <Pagination {...pagination} className={styles.fullWidth} />}
        renderEmptyStateRow={() => <div>{t('applicationView.customersTable.emptyState')}</div>}
        onSortedColChange={onSortedColChange}
        canSelectOneRow
      />
    </>
  );
};

export default SimilarCustomersTable;
