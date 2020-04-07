import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  useTable,
  useExpanded,
  useSortBy,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  TableOptions,
  HeaderProps,
  Row,
  HeaderGroup,
  Column as ColumnType,
  UseGlobalFiltersInstanceProps,
  useFlexLayout,
  TableState,
} from 'react-table';

import Checkbox from '../checkbox/Checkbox';
import Radio from '../radio/Radio';
import styles from './table.module.scss';
import Icon from '../icons/Icon';

export type Column<D extends object> = ColumnType<D>;

interface TState<D extends object> extends TableState<D> {
  selectedRows: Array<Row<D>['original']>;
}

interface Setters<D extends object> {
  setGlobalFilter: UseGlobalFiltersInstanceProps<D>['setGlobalFilter'];
}

type TableToolsFn<D extends object> = (
  tableState: TState<D>,
  setters: Setters<D>
) => React.ReactNode;

type Props<D extends object> = {
  className?: string;
  data: D[];
  canSelectRows?: boolean;
  canSelectOneRow?: boolean;
  renderTableToolsTop?: TableToolsFn<D>;
  renderTableToolsBottom?: TableToolsFn<D>;
  renderSubComponent?: (row: Row<D>) => React.ReactNode;
  renderMainHeader?: (props: HeaderProps<D>) => React.ReactNode;
  renderEmptyStateRow?: () => React.ReactNode;
} & TableOptions<D>;

const EXPANDER = 'EXPANDER';
const MAIN_HEADER = 'MAIN_HEADER';
const SELECTOR = 'SELECTOR';
const RADIO_SELECTOR = 'RADIO_SELECTOR';

const BASE_COL_WIDTH = 150;

export enum COLUMN_WIDTH {
  'XXS' = 0.25 * BASE_COL_WIDTH,
  'XS' = 0.5 * BASE_COL_WIDTH,
  'S' = 0.75 * BASE_COL_WIDTH,
  'M' = 1 * BASE_COL_WIDTH,
  'L' = 1.5 * BASE_COL_WIDTH,
  'XL' = 2 * BASE_COL_WIDTH,
  'XXL' = 3 * BASE_COL_WIDTH,
}

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

  const selectorCol: Column<D> = React.useMemo(
    () => ({
      Cell: ({ row }) => (
        <Checkbox size="large" {...row.getToggleRowSelectedProps()} />
      ),
      Header: ({ getToggleAllRowsSelectedProps }) => (
        <Checkbox size="large" {...getToggleAllRowsSelectedProps()} />
      ),
      id: SELECTOR,
    }),
    []
  );

  const radioSelectorCol: Column<D> = React.useMemo(
    () => ({
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
    }),
    []
  );

  const expanderCol: Column<D> = React.useMemo(
    () => ({
      Cell: ({ row }) => (
        <div {...row.getToggleRowExpandedProps()}>
          <Icon
            shape="IconAngleDown"
            size="small"
            className={classNames(styles.expandArrow, {
              [styles.isExpanded]: row.isExpanded,
            })}
          />
        </div>
      ),
      Header: ({ toggleAllRowsExpanded }) => (
        <button onClick={() => toggleAllRowsExpanded(false)}>
          {t('common.table.minimizeAll')}
        </button>
      ),
      id: EXPANDER,
      minWidth: 0,
    }),
    [t]
  );

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
    selectedFlatRows,
    setGlobalFilter,
    state,
  } = useTable(
    {
      columns: tableColumns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useFlexLayout,
    useSortBy,
    useExpanded,
    useRowSelect
  );

  const renderTableHead = (headerGroup: HeaderGroup<D>, index: number) => (
    <div
      {...headerGroup.getHeaderGroupProps()}
      className={classNames(styles.header, {
        [styles.mainHeader]: renderMainHeader && index === 0,
      })}
    >
      {headerGroup.headers.map(column => (
        <div
          {...column.getHeaderProps(column.getSortByToggleProps())}
          className={classNames(styles.headerCell, {
            [styles.selector]: column.id === SELECTOR,
            [styles.radioSelector]: column.id === RADIO_SELECTOR,
            [styles.expander]: column.id === EXPANDER,
          })}
        >
          {column.render('Header')}
          {column.canSort && (
            <div
              className={classNames(styles.sortArrowWrapper, {
                [styles.isSorted]: column.isSorted,
              })}
            >
              <Icon
                className={classNames(styles.sortArrow, {
                  [styles.sortArrowDown]: !column.isSortedDesc,
                })}
                shape="IconArrowLeft"
                size="small"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderTableBody = (row: Row<D>) => {
    prepareRow(row);
    return (
      <div
        key={row.index}
        className={classNames(styles.rowWrapper, {
          [styles.isSelected]: row.isSelected,
        })}
      >
        <div {...row.getRowProps()}>
          {row.cells.map(cell => (
            <div
              {...cell.getCellProps()}
              className={classNames(styles.tableCell, {
                [styles.selector]: cell.column.id === SELECTOR,
                [styles.radioSelector]: cell.column.id === RADIO_SELECTOR,
                [styles.expander]: cell.column.id === EXPANDER,
              })}
            >
              {cell.render('Cell')}
            </div>
          ))}
        </div>
        {renderSubComponent && row.isExpanded && (
          <div className={styles.subComponent}>{renderSubComponent(row)}</div>
        )}
      </div>
    );
  };

  const renderEmptyBody = () => (
    <div className={styles.rowWrapper} role="row">
      <div className={styles.tableCell}>
        {state.globalFilter
          ? t('common.table.noMatches')
          : renderEmptyStateRow?.()}
      </div>
    </div>
  );

  const renderTableTools = (fn?: TableToolsFn<D>) => {
    return fn?.(
      {
        ...state,
        selectedRows: selectedFlatRows.map(row => row.original),
      },
      { setGlobalFilter }
    );
  };

  return (
    <div className={classNames(styles.tableWrapper, className)}>
      {renderTableTools(renderTableToolsTop)}
      <div {...getTableProps()} className={styles.table}>
        {headerGroups.map(renderTableHead)}
        <div {...getTableBodyProps()}>
          {rows.map(renderTableBody)}
          {rows.length === 0 && renderEmptyBody()}
        </div>
      </div>
      {renderTableTools(renderTableToolsBottom)}
    </div>
  );
};

export default Table;
