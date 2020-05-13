import React from 'react';
import { Cell } from 'react-table';
import { useTranslation } from 'react-i18next';
import equal from 'fast-deep-equal';

import HarborViewTableTools from './harborViewTableTools/HarborViewTableTools';
import PierSelectHeader from './pierSelectHeader/PierSelectHeader';
import BerthDetails from '../../common/berthDetails/BerthDetails';
import Table, { Column } from '../../common/table/Table';
import { Berth, Pier } from './utils/utils';
import Chip from '../../common/chip/Chip';
import InternalLink from '../../common/internalLink/InternalLink';
import { formatDimension } from '../../common/utils/format';
import Pagination from '../../common/pagination/Pagination';

interface Props {
  berths: Berth[];
  piers: Pier[];
  onAddBerth(): void;
  onAddPier(): void;
  onEditBerth(berth: Berth): void;
  onEditPier(pier: Pier): void;
}

const HarborViewPageTable: React.FC<Props> = ({ berths, piers, onAddBerth, onAddPier, onEditBerth, onEditPier }) => {
  const { t, i18n } = useTranslation();
  const columns: Column<Berth>[] = [
    {
      Header: t('harborView.tableHeaders.number') || '',
      accessor: 'number',
      filter: 'text',
    },
    {
      Header: t('harborView.tableHeaders.identifier') || '',
      accessor: 'identifier',
      filter: 'text',
    },
    {
      Cell: ({ cell }: { cell: Cell<Berth> }) => {
        const isBerthActive = cell.row.original.isActive;
        if (!isBerthActive) {
          return <Chip color="red" label={t('harborView.berthProperties.inactive')} />;
        }
        const activeLease = cell.row.original.leases?.find((lease) => lease.isActive);
        if (!activeLease) {
          return cell.value;
        }
        return <InternalLink to={`/customers/${activeLease.customer.id}}`}>{cell.value}</InternalLink>;
      },
      Header: t('harborView.tableHeaders.customer') || '',
      accessor: ({ leases }) => {
        const activeLease = leases?.find((lease) => lease.isActive);
        if (!activeLease) return '';
        return `${activeLease.customer.firstName} ${activeLease.customer.lastName}`;
      },
      id: 'leases',
      filter: 'text',
    },
    {
      Header: t('harborView.tableHeaders.length') || '',
      accessor: ({ length }) => formatDimension(length, i18n.language),
      id: 'length',
      filter: 'text',
    },
    {
      Header: t('harborView.tableHeaders.width') || '',
      accessor: ({ width }) => formatDimension(width, i18n.language),
      id: 'width',
      filter: 'text',
    },
    {
      Header: t('harborView.tableHeaders.depth') || '',
      accessor: ({ depth }) => formatDimension(depth, i18n.language),
      id: 'depth',
      filter: 'text',
    },
    {
      Header: t('harborView.tableHeaders.mooring') || '',
      accessor: ({ mooringType }) => t([`common.mooringTypes.${mooringType}`, mooringType]),
      id: 'mooringType',
      filter: 'text',
    },
  ];
  return (
    <Table
      data={berths}
      columns={columns}
      canSelectRows
      renderTableToolsTop={(_, setters) => (
        <HarborViewTableTools
          onAddBerth={onAddBerth}
          onAddPier={onAddPier}
          handleGlobalFilter={setters.setGlobalFilter}
          canAddBerth={piers.length > 0}
        />
      )}
      styleMainHeader={false}
      renderMainHeader={(props) => (
        <PierSelectHeader
          piers={piers}
          onEdit={onEditPier}
          selectedPier={piers.find((pier) =>
            props.state.filters
              .filter((filter) => filter.id === 'identifier')
              .find((filter) => filter.value === pier.identifier)
          )}
          onPierSelect={(pier) => {
            props.setFilter('identifier', pier?.identifier);
          }}
        />
      )}
      renderSubComponent={(row) => (
        <BerthDetails
          leases={row.original.leases ?? []}
          comment={row.original.comment}
          onEdit={() => onEditBerth(row.original)}
        />
      )}
      renderPaginator={({ pageIndex, pageCount, goToPage }) => (
        <Pagination
          forcePage={pageIndex}
          pageCount={pageCount || 1}
          onPageChange={({ selected }) => goToPage(selected)}
        />
      )}
    />
  );
};

// Only re-render the table when data has changed.
export default React.memo(HarborViewPageTable, (prevProps, nextProps) => {
  return equal(prevProps.piers, nextProps.piers) && equal(prevProps.berths, nextProps.berths);
});
