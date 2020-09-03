import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';

import { WinterStoragePlace, WinterStorageSection } from './types';
import InternalLink from '../../common/internalLink/InternalLink';
import Table, { Column } from '../../common/table/Table';
import Chip from '../../common/chip/Chip';
import SelectHeader from '../../common/selectHeader/SelectHeader';
import Pagination from '../../common/pagination/Pagination';
import GlobalSearchTableTools from '../../common/tableTools/globalSearchTableTools/GlobalSearchTableTools';
import { formatDimension } from '../../common/utils/format';

type ColumnType = Column<WinterStoragePlace>;

interface WinterStorageAreaViewTableProps {
  places: WinterStoragePlace[];
  sections: WinterStorageSection[];
  className?: string;
}

const WinterStorageAreaViewTable = ({ places, sections, className }: WinterStorageAreaViewTableProps) => {
  const { t, i18n } = useTranslation();
  const columns: ColumnType[] = [
    {
      Header: t('winterStorageAreaView.tableHeaders.number') || '',
      accessor: 'number',
      filter: 'text',
    },
    {
      Header: t('winterStorageAreaView.tableHeaders.identifier') || '',
      accessor: 'identifier',
      filter: 'exact',
    },
    {
      Cell: ({ cell }: { cell: Cell<WinterStoragePlace> }) => {
        const isPlaceActive = cell.row.original.isActive;
        if (!isPlaceActive) {
          return <Chip color="red" label={t('winterStorageAreaView.berthProperties.inactive')} />;
        }
        const activeLease = cell.row.original.leases?.find((lease) => lease.isActive);
        if (!activeLease) {
          return cell.value;
        }
        return <InternalLink to={`/customers/${activeLease.customer.id}`}>{cell.value}</InternalLink>;
      },
      Header: t('winterStorageAreaView.tableHeaders.customer') || '',
      accessor: ({ leases }) => {
        const activeLease = leases?.find((lease) => lease.isActive);
        if (!activeLease) return '';
        return `${activeLease.customer.firstName} ${activeLease.customer.lastName}`;
      },
      id: 'leases',
      filter: 'text',
    },
    {
      Header: t('winterStorageAreaView.tableHeaders.length') || '',
      accessor: ({ length }) => formatDimension(length, i18n.language),
      id: 'length',
      filter: 'text',
    },
    {
      Header: t('winterStorageAreaView.tableHeaders.width') || '',
      accessor: ({ width }) => formatDimension(width, i18n.language),
      id: 'width',
      filter: 'text',
    },
  ];

  return (
    <Table
      className={className}
      data={places}
      columns={columns}
      canSelectRows
      renderTableToolsTop={(_, setters) => <GlobalSearchTableTools handleGlobalFilter={setters.setGlobalFilter} />}
      renderMainHeader={(props) => {
        const sectionFilters = props.state.filters.filter((filter) => filter.id === 'identifier');
        const selectedSection = sections.find(({ identifier }) =>
          sectionFilters.find(({ value }) => value === identifier)
        );

        if (sectionFilters.length && selectedSection === undefined) props.setFilter('identifier', undefined);

        return (
          <SelectHeader
            items={sections}
            selectedItem={selectedSection}
            allLabel={t('common.table.all')}
            editLabel={t('common.edit')}
            formatter={(section) => `${t('winterStorageAreaView.tableHeaders.identifier')} ${section.identifier}`}
            equals={(a, b) => a.identifier === b.identifier}
            onSelect={(section) => props.setFilter('identifier', section?.identifier)}
          />
        );
      }}
      styleMainHeader={false}
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

export default WinterStorageAreaViewTable;
