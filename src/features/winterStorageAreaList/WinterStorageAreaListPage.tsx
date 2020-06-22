import React from 'react';
import { useTranslation } from 'react-i18next';

import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import styles from './winterStorageAreaListPage.module.scss';
import { WinterStorageAreaData } from './types';
import PageTitle from '../../common/pageTitle/PageTitle';

type ColumnType = Column<WinterStorageAreaData> & { accessor: keyof WinterStorageAreaData };

export type WinterStorageAreaListPageProps = {
  data: Array<WinterStorageAreaData>;
  loading?: boolean;
};

const WinterStorageAreaListPage = ({ data, loading }: WinterStorageAreaListPageProps) => {
  const { t } = useTranslation();

  const columns: ColumnType[] = [
    {
      Header: t('winterStorageAreaList.tableHeaders.name') || '',
      accessor: 'name',
      width: COLUMN_WIDTH.S,
    },
  ];

  return (
    <div className={styles.winterStorageAreaListPage}>
      <PageTitle title={t('winterStorageAreaList.title')} />
      <Table data={data} loading={loading} columns={columns} />
    </div>
  );
};

export default WinterStorageAreaListPage;
