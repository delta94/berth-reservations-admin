import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconTrash } from 'hds-react';

import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import HarborDetails from './harborDetails/HarborDetails';
import InternalLink from '../../common/internalLink/InternalLink';
import IconWrapper from '../../common/iconWrapper/IconWrapper';
import GlobalSearchTableTools from '../../common/tableTools/globalSearchTableTools/GlobalSearchTableTools';
import Pagination from '../../common/pagination/Pagination';
import PageTitle from '../../common/pageTitle/PageTitle';
import { HarborData } from './types';
import { IconFence, IconPlug, IconStreetLight, IconWaterTap } from '../../common/icons';
import PageContent from '../../common/pageContent/PageContent';
import BerthSummary from './berthSummary/BerthSummary';
import { calculateBerthSummary } from './utils';

type ColumnType = Column<HarborData> & { accessor: keyof HarborData };

export interface HarborListProps {
  data: Array<HarborData>;
  loading?: boolean;
}

const HarborList = ({ data, loading }: HarborListProps) => {
  const { t } = useTranslation();

  const columns: ColumnType[] = [
    {
      Cell: ({ cell }) => <InternalLink to={`/harbors/${cell.row.original.id}`}>{cell.value}</InternalLink>,
      Header: t('harborList.tableHeaders.harbor') || '',
      accessor: 'name',
      width: COLUMN_WIDTH.XL,
    },
    {
      Header: t('harborList.tableHeaders.places') || '',
      accessor: 'numberOfPlaces',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('harborList.tableHeaders.freePlaces') || '',
      accessor: 'numberOfFreePlaces',
      width: COLUMN_WIDTH.S,
    },
    {
      Cell: ({ cell }) => <IconWrapper outlined icon={IconPlug} color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <IconWrapper outlined icon={IconPlug} />,
      accessor: 'electricity',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => <IconWrapper outlined icon={IconFence} color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <IconWrapper outlined icon={IconFence} />,
      accessor: 'gate',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => <IconWrapper outlined icon={IconStreetLight} color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <IconWrapper outlined icon={IconStreetLight} />,
      accessor: 'lighting',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => <IconWrapper outlined icon={IconWaterTap} color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <IconWrapper outlined icon={IconWaterTap} />,
      accessor: 'water',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => <IconWrapper outlined icon={IconTrash} color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <IconWrapper outlined icon={IconTrash} />,
      accessor: 'wasteCollection',
      width: COLUMN_WIDTH.XS,
    },
  ];

  const { berthCount, freeCount, reservedCount, otherCount, offeredCount } = calculateBerthSummary(data);

  return (
    <PageContent>
      <PageTitle title={t('harborList.title')} />
      <BerthSummary
        berthCount={berthCount}
        freeCount={freeCount}
        reservedCount={reservedCount}
        otherCount={otherCount}
        offeredCount={offeredCount}
      />
      <Table
        data={data}
        loading={loading}
        columns={columns}
        renderTableToolsTop={(_, setters) => <GlobalSearchTableTools handleGlobalFilter={setters.setGlobalFilter} />}
        renderSubComponent={(row) => <HarborDetails {...row.original} />}
        renderMainHeader={() => t('harborList.tableHeaders.mainHeader')}
        renderEmptyStateRow={() => t('common.notification.noData.description')}
        renderPaginator={({ pageIndex, pageCount, goToPage }) => (
          <Pagination
            forcePage={pageIndex}
            pageCount={pageCount || 1}
            onPageChange={({ selected }) => goToPage(selected)}
          />
        )}
        canSelectRows
      />
    </PageContent>
  );
};

export default HarborList;
