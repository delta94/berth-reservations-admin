import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './offer.module.scss';
import PageTitle from '../../common/pageTitle/PageTitle';
import PageContent from '../../common/pageContent/PageContent';
import HarborCard, { HarborCardProps } from '../../common/harborCard/HarborCard';
import BoatCard from '../../common/boatCard/BoatCard';
import Table, { Column, COLUMN_WIDTH } from '../../common/table/Table';
import BerthDetails from '../../common/berthDetails/BerthDetails';
import TableFilters from '../../common/tableFilters/TableFilters';
import TableTools from './tableTools/TableTools';
import Button from '../../common/button/Button';
import InternalLink from '../../common/internalLink/InternalLink';
import { formatDimension } from '../../common/utils/format';
import { ApplicationStatus } from '../../@types/__generated__/globalTypes';
import { Boat } from '../../common/boatCard/types';
import { BerthData, PierTab } from './types';

interface OfferProps {
  applicationDate: string;
  applicationStatus: ApplicationStatus;
  applicationType: string;
  boat: Boat | null;
  handleClickSelect: (berthId: string) => void;
  handleReturn: () => void;
  harbor: HarborCardProps | null;
  isSubmitting: boolean;
  piersIdentifiers: PierTab[];
  tableData: BerthData[];
}

type ColumnType = Column<BerthData> & { accessor: keyof BerthData };

const Offer = ({
  applicationDate,
  applicationStatus,
  applicationType,
  boat,
  handleClickSelect,
  handleReturn,
  harbor,
  isSubmitting,
  piersIdentifiers,
  tableData,
}: OfferProps) => {
  const { t, i18n } = useTranslation();

  const columns: ColumnType[] = [
    {
      Cell: ({ row }) => (
        <Button onClick={() => handleClickSelect(row.original.id)} disabled={isSubmitting}>
          {t('offer.tableCells.select')}
        </Button>
      ),
      Header: t('offer.tableHeaders.selection') || '',
      accessor: 'berthId',
      width: COLUMN_WIDTH.S,
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Cell: ({ cell }) => <InternalLink to={`/harbors/${cell.row.original.harborId}}`}>{cell.value}</InternalLink>,
      Header: t('offer.tableHeaders.harbor') || '',
      accessor: 'harbor',
      width: COLUMN_WIDTH.XL,
    },
    {
      Header: t('offer.tableHeaders.pier') || '',
      accessor: 'pier',
      filter: 'exactText',
      width: COLUMN_WIDTH.S,
    },
    {
      Header: t('offer.tableHeaders.berth') || '',
      accessor: 'berth',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
      Header: t('offer.tableHeaders.width') || '',
      accessor: 'width',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
      Header: t('offer.tableHeaders.length') || '',
      accessor: 'length',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => formatDimension(cell.value, i18n.language),
      Header: t('offer.tableHeaders.draught') || '',
      accessor: 'draught',
      width: COLUMN_WIDTH.XS,
    },
    {
      Cell: ({ cell }) => t([`common.mooringTypes.${cell.value}`, cell.value]),
      Header: t('offer.tableHeaders.mooringType') || '',
      accessor: 'mooringType',
      width: COLUMN_WIDTH.S,
    },
  ];

  return (
    <PageContent className={styles.offer}>
      <PageTitle title={t('offer.title')} />
      {harbor && <HarborCard {...harbor} className={styles.card} />}
      {boat && <BoatCard boat={boat} />}
      <Table
        data={tableData}
        columns={columns}
        renderSubComponent={(row) => {
          const { properties, leases, comment } = row.original;
          return <BerthDetails leases={leases} comment={comment} {...properties} />;
        }}
        renderMainHeader={(props) => (
          <TableFilters
            activeFilters={props.state.filters.map((filter) => filter.value)}
            filters={piersIdentifiers}
            handleSetFilter={(filter) => props.setFilter('pier', filter)}
            filterPrefix={t('offer.tableHeaders.pierFilterBtn')}
          />
        )}
        renderTableToolsTop={() => (
          <TableTools
            applicationDate={applicationDate}
            applicationType={applicationType}
            applicationStatus={applicationStatus}
            handleReturn={handleReturn}
          />
        )}
      />
    </PageContent>
  );
};

export default Offer;
