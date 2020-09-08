import React from 'react';
import { useTranslation } from 'react-i18next';

import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';
import InternalLink from '../../common/internalLink/InternalLink';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import { formatDate } from '../../common/utils/format';
import Chip from '../../common/chip/Chip';
import { APPLICATION_STATUS } from '../../common/utils/consonants';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';
import { UnmarkedWinterStorageNotice } from './utils';
import { SortedCol } from '../../common/utils/useBackendSorting';
import UnmarkedWsNoticeDetails from '../../common/unmarkedWsNoticeDetails/UnmarkedWsNoticeDetails';
import Pagination from '../../common/pagination/Pagination';
import CardHeader from '../../common/cardHeader/CardHeader';

export interface UnmarkedWsNoticeListProps {
  notices: UnmarkedWinterStorageNotice[];
  loading: boolean;
  pageCount: number;
  pageIndex: number;
  goToPage(page: number): void;
  onSortedColChange(sortedCol: SortedCol | undefined): void;
}

type ColumnType = Column<UnmarkedWinterStorageNotice>;

const UnmarkedWsNoticeList = ({
  notices,
  loading,
  pageCount,
  pageIndex,
  goToPage,
  onSortedColChange,
}: UnmarkedWsNoticeListProps) => {
  const { t, i18n } = useTranslation();
  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => (
        <InternalLink to={`/unmarked-ws-notices/${cell.value}`}>
          {t('applicationList.applicationType.newApplication')}
        </InternalLink>
      ),
      Header: t('applicationList.tableHeaders.applicationType') || '',
      accessor: 'id',
      filter: 'exact',
      disableSortBy: true,
      width: COLUMN_WIDTH.M,
    },
    {
      Cell: ({ cell }) => formatDate(cell.value, i18n.language),
      Header: t('applicationList.tableHeaders.pvm') || '',
      accessor: 'createdAt',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('applicationList.tableHeaders.queue') || '',
      accessor: 'queue',
      disableSortBy: true,
      width: COLUMN_WIDTH.XS,
    },
    {
      Header: t('applicationList.tableHeaders.municipality') || '',
      accessor: 'municipality',
      disableSortBy: true,
      width: COLUMN_WIDTH.S,
    },
    {
      Cell: ({ cell: { value } }) => (
        <Chip
          color={APPLICATION_STATUS[value as ApplicationStatus].color}
          label={t(APPLICATION_STATUS[value as ApplicationStatus].label)}
        />
      ),
      Header: t('applicationList.tableHeaders.status') || '',
      accessor: 'status',
      disableSortBy: true,
      width: COLUMN_WIDTH.M,
    },
  ];

  return (
    <PageContent>
      <PageTitle title={t('applicationList.unmarkedWsTitle')} />
      <Table
        columns={columns}
        data={notices}
        loading={loading}
        renderSubComponent={(row) => <UnmarkedWsNoticeDetails {...row.original} />}
        renderMainHeader={() => <CardHeader title={t('applicationList.unmarkedWsTitle')} />}
        renderTableToolsBottom={() => (
          <Pagination forcePage={pageIndex} pageCount={pageCount} onPageChange={({ selected }) => goToPage(selected)} />
        )}
        renderEmptyStateRow={() => t('common.notification.noData.description')}
        onSortedColChange={onSortedColChange}
        canSelectRows
      />
    </PageContent>
  );
};

export default UnmarkedWsNoticeList;
