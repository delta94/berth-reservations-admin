import React from 'react';
import { useTranslation } from 'react-i18next';

import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import { WinterStorageAreaData } from './types';
import PageTitle from '../../common/pageTitle/PageTitle';
import IconWrapper from '../../common/iconWrapper/IconWrapper';
import { IconDollyEmpty, IconFence, IconPlug, IconTrestle, IconWaterTap } from '../../common/icons';
import PageContent from '../../common/pageContent/PageContent';
import Pagination from '../../common/pagination/Pagination';

type ColumnType = Column<WinterStorageAreaData> & { accessor: keyof WinterStorageAreaData };

export type WinterStorageAreaListProps = {
  data: Array<WinterStorageAreaData>;
  loading?: boolean;
};

const WinterStorageAreaList = ({ data, loading }: WinterStorageAreaListProps) => {
  const { t } = useTranslation();

  const columns: ColumnType[] = [
    {
      Header: t('winterStorageAreaList.tableHeaders.name') || '',
      accessor: 'name',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('winterStorageAreaList.tableHeaders.places') || '',
      accessor: 'numberOfMarkedPlaces',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('winterStorageAreaList.tableHeaders.freePlaces') || '',
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
      Cell: ({ cell }) => <IconWrapper outlined icon={IconWaterTap} color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <IconWrapper outlined icon={IconWaterTap} />,
      accessor: 'water',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => <IconWrapper outlined icon={IconFence} color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <IconWrapper outlined icon={IconFence} />,
      accessor: 'gate',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => <IconWrapper outlined icon={IconTrestle} color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <IconWrapper outlined icon={IconTrestle} />,
      accessor: 'summerStorageForDockingEquipment',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => <IconWrapper outlined icon={IconDollyEmpty} color={!cell.value ? 'disabled' : 'standard'} />,
      Header: () => <IconWrapper outlined icon={IconDollyEmpty} />,
      accessor: 'summerStorageForTrailers',
      width: COLUMN_WIDTH.XS,
    },
  ];

  return (
    <PageContent>
      <PageTitle title={t('winterStorageAreaList.title')} />
      <Table
        canSelectRows
        columns={columns}
        data={data}
        loading={loading}
        renderEmptyStateRow={() => t('common.notification.noData.description')}
        renderMainHeader={() => t('winterStorageAreaList.tableHeaders.mainHeader')}
        renderPaginator={({ pageIndex, pageCount, goToPage }) => (
          <Pagination
            forcePage={pageIndex}
            pageCount={pageCount || 1}
            onPageChange={({ selected }) => goToPage(selected)}
          />
        )}
        renderSubComponent={() => <div>Placeholder</div>}
      />
    </PageContent>
  );
};

export default WinterStorageAreaList;
