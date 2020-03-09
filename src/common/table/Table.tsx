import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  useTable,
  useExpanded,
  useSortBy,
  useRowSelect,
  TableOptions,
  HeaderProps,
  Row,
  HeaderGroup,
  Column as ColumnType,
} from 'react-table';

import { IconArrowLeft, IconAngleDown, IconAngleUp } from '../../common/icons';
import Checkbox from '../checkbox/Checkbox';
import Radio from '../radio/Radio';
import styles from './table.module.scss';
import iconStyles from '../icons/icon.module.scss';

export type Column<D extends object> = ColumnType<D>;

interface TState<D extends object> {
  selectedRows: Array<Row<D>['original']>;
}

type Props<D extends object> = {
  className?: string;
  data: D[];
  canSelectRows?: boolean;
  canSelectOneRow?: boolean;
  renderTableToolsTop?: (tableState: TState<D>) => React.ReactNode;
  renderTableToolsBottom?: (tableState: TState<D>) => React.ReactNode;
  renderSubComponent?: (row: Row<D>) => React.ReactNode;
  renderMainHeader?: (props: HeaderProps<D>) => React.ReactNode;
  renderEmptyStateRow?: () => React.ReactNode;
} & TableOptions<D>;

const EXPANDER = 'EXPANDER';
const MAIN_HEADER = 'MAIN_HEADER';
const SELECTOR = 'SELECTOR';
const RADIO_SELECTOR = 'RADIO_SELECTOR';

const Table = <D extends object>({
  className,
  columns,
  data: tableData,
  canSelectRows,
  canSelectOneRow,
  renderTableToolsTop,
  renderTableToolsBottom,
  renderSubComponent,
  renderMainHeader,
  renderEmptyStateRow,
}: Props<D>) => {
  const { t } = useTranslation();

  const selectorCol: Column<D> = {
    Cell: ({ row }) => (
      <Checkbox size="large" {...row.getToggleRowSelectedProps()} />
    ),
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <Checkbox size="large" {...getToggleAllRowsSelectedProps()} />
    ),
    id: SELECTOR,
  };

  const radioSelectorCol: Column<D> = {
    Cell: ({ row, toggleAllRowsSelected, toggleRowSelected }) => (
      <Radio
        size="large"
        {...row.getToggleRowSelectedProps()}
        onChange={() => {
          toggleAllRowsSelected(false);
          toggleRowSelected(row.id);
        }}
      />
    ),
    id: RADIO_SELECTOR,
  };

  const expanderCol: Column<D> = {
    Cell: ({ row }) => (
      <div
        {...row.getToggleRowExpandedProps()}
        className={styles.expandArrowWrapper}
      >
        {row.isExpanded ? (
          <IconAngleUp
            className={classNames(iconStyles.icon, iconStyles.small)}
          />
        ) : (
          <IconAngleDown
            className={classNames(iconStyles.icon, iconStyles.small)}
          />
        )}
      </div>
    ),
    Header: ({ state, toggleAllRowsExpanded }) => (
      <span onClick={() => toggleAllRowsExpanded(false)}>
        {t('common.table.minimizeAll')}
      </span>
    ),
    id: EXPANDER,
  };

  const tableColumns = React.useMemo(() => {
    const headers = [
      ...(canSelectRows ? [selectorCol] : []),
      ...(canSelectOneRow ? [radioSelectorCol] : []),
      ...columns,
      ...(renderSubComponent ? [expanderCol] : []),
    ];

    const withMainHeader = [
      {
        Header: renderMainHeader,
        columns: headers,
        id: MAIN_HEADER,
      },
    ];

    return renderMainHeader ? withMainHeader : headers;
  }, [
    canSelectRows,
    canSelectOneRow,
    columns,
    renderSubComponent,
    renderMainHeader,
    selectorCol,
    radioSelectorCol,
    expanderCol,
  ]);

  const data = React.useMemo(() => tableData, [tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    flatHeaders,
    selectedFlatRows,
    visibleColumns,
  } = useTable(
    {
      columns: tableColumns,
      data,
    },
    useSortBy,
    useExpanded,
    useRowSelect
  );

  const renderTableHead = (headerGroup: HeaderGroup<D>) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        <th
          {...column.getHeaderProps(column.getSortByToggleProps())}
          className={classNames(styles.tableHeader, {
            [styles.mainHeader]: renderMainHeader && column.depth === 0,
            [styles.selector]: column.id === SELECTOR,
            [styles.radioSelector]: column.id === RADIO_SELECTOR,
            [styles.expander]: column.id === EXPANDER,
          })}
        >
          {column.render('Header')}
          {column.isSorted && (
            <div className={styles.arrow}>
              {column.isSortedDesc ? (
                <IconArrowLeft
                  className={classNames(
                    iconStyles.icon,
                    iconStyles.small,
                    iconStyles.left
                  )}
                />
              ) : (
                <IconArrowLeft
                  className={classNames(
                    iconStyles.icon,
                    iconStyles.small,
                    iconStyles.right
                  )}
                />
              )}
            </div>
          )}
        </th>
      ))}
    </tr>
  );

  const renderTableBody = (row: Row<D>) => {
    prepareRow(row);
    return (
      <React.Fragment key={row.index}>
        <tr
          {...row.getRowProps()}
          className={classNames(styles.tableRow, {
            [styles.selected]: row.isSelected,
          })}
        >
          {row.cells.map(cell => (
            <td
              {...cell.getCellProps()}
              className={classNames(styles.tableCell, {
                [styles.selector]: cell.column.id === SELECTOR,
                [styles.radioSelector]: cell.column.id === RADIO_SELECTOR,
              })}
            >
              {cell.render('Cell')}
            </td>
          ))}
        </tr>
        {renderSubComponent && row.isExpanded && (
          <tr className={classNames(styles.tableRow, styles.expandedRow)}>
            <td className={styles.tableCell} colSpan={flatHeaders.length}>
              {renderSubComponent(row)}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  const renderEmptyBody = () => (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell} colSpan={visibleColumns.length}>
        {renderEmptyStateRow?.()}
      </td>
    </tr>
  );

  return (
    <div className={className}>
      {renderTableToolsTop?.({
        selectedRows: selectedFlatRows.map(row => row.original),
      })}
      <table {...getTableProps()} className={styles.table}>
        <thead>{headerGroups.map(renderTableHead)}</thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(renderTableBody)}
          {rows.length === 0 && renderEmptyBody()}
        </tbody>
      </table>
      {renderTableToolsBottom?.({
        selectedRows: selectedFlatRows.map(row => row.original),
      })}
    </div>
  );
};

export default Table;
