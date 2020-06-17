import React, { useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  useTable,
  useExpanded,
  useSortBy,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  usePagination,
  TableOptions,
  HeaderProps,
  Row,
  HeaderGroup,
  Column as ColumnType,
  UseGlobalFiltersInstanceProps,
  useFlexLayout,
  TableState,
  UseFiltersColumnOptions,
  UseSortByColumnOptions,
  UseFiltersInstanceProps,
  UseGlobalFiltersOptions,
  actions,
} from 'react-table';
import { IconAngleDown, IconArrowLeft, RadioButton, Checkbox } from 'hds-react';

import styles from './table.module.scss';

export type Column<D extends object> = ColumnType<D> & UseFiltersColumnOptions<D> & UseSortByColumnOptions<D>;

interface TState<D extends object> extends TableState<D> {
  selectedRows: Array<Row<D>['original']>;
}

interface Setters<D extends object> {
  setGlobalFilter: UseGlobalFiltersInstanceProps<D>['setGlobalFilter'];
  setFilter: UseFiltersInstanceProps<D>['setFilter'];
  resetSelectedRows: () => void;
}

type TableToolsFn<D extends object> = (tableState: TState<D>, setters: Setters<D>) => React.ReactNode;

type TableProps<D extends object> = {
  className?: string;
  data: D[];
  loading?: boolean;
  canSelectRows?: boolean;
  canSelectOneRow?: boolean;
  styleMainHeader?: boolean;
  theme?: 'basic' | 'primary';
  globalFilter?: UseGlobalFiltersOptions<D>['globalFilter'];
  renderTableToolsTop?: TableToolsFn<D>;
  renderTableToolsBottom?: TableToolsFn<D>;
  renderSubComponent?: (row: Row<D>) => React.ReactNode;
  renderMainHeader?: (props: HeaderProps<D>) => React.ReactNode;
  renderEmptyStateRow?: () => React.ReactNode;
  // Client-Side pagination
  renderPaginator?: (pagination: {
    pageIndex: number;
    pageCount: number;
    goToPage(pageIndex: number): void;
  }) => React.ReactNode;
  onSortedColChange?: (sortedCol: TableState<D>['sortBy'][0] | undefined) => void;
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
  'M' = BASE_COL_WIDTH,
  'L' = 1.5 * BASE_COL_WIDTH,
  'XL' = 2 * BASE_COL_WIDTH,
  'XXL' = 3 * BASE_COL_WIDTH,
}

const Table = <D extends { id: string }>({
  className,
  columns,
  data: tableData,
  loading,
  canSelectRows,
  canSelectOneRow,
  styleMainHeader = true,
  theme = 'primary',
  globalFilter,
  initialState,
  renderTableToolsTop,
  renderTableToolsBottom,
  renderSubComponent,
  renderMainHeader,
  renderEmptyStateRow,
  renderPaginator,
  onSortedColChange,
}: TableProps<D>) => {
  const { t } = useTranslation();

  const selectorCol: Column<D> = React.useMemo(
    () => ({
      Cell: ({ row }: { row: any }) => {
        const { title, style, checked, onChange } = row.getToggleRowSelectedProps();
        return <Checkbox id={'checkbox-' + row.id} title={title} style={style} checked={checked} onChange={onChange} />;
      },
      Header: ({ getToggleAllRowsSelectedProps }) => {
        const { title, style, checked, onChange } = getToggleAllRowsSelectedProps();
        return <Checkbox id={'checkbox'} title={title} style={style} checked={checked} onChange={onChange} />;
      },
      id: SELECTOR,
    }),
    []
  );

  const radioSelectorCol: Column<D> = React.useMemo(
    () => ({
      Cell: ({
        row,
        toggleAllRowsSelected,
        toggleRowSelected,
      }: {
        row: any;
        toggleAllRowsSelected: (selected: boolean) => void;
        toggleRowSelected: (rowId: string) => void;
      }) => {
        const { title, style, checked } = row.getToggleRowSelectedProps();
        return (
          <RadioButton
            id={'radio-' + row.id}
            title={title}
            style={style}
            checked={checked}
            onChange={() => {
              toggleAllRowsSelected(false);
              toggleRowSelected(row.id);
            }}
          />
        );
      },
      id: RADIO_SELECTOR,
    }),
    []
  );

  const expanderCol: Column<D> = React.useMemo(
    () => ({
      Cell: ({ row }: { row: any }) => (
        <div {...row.getToggleRowExpandedProps()}>
          <IconAngleDown
            size="m"
            className={classNames(styles.expandArrow, {
              [styles.isExpanded]: row.isExpanded,
            })}
          />
        </div>
      ),
      Header: ({ toggleAllRowsExpanded }) => (
        <button onClick={() => toggleAllRowsExpanded(false)}>{t('common.table.minimizeAll')}</button>
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

  const [dataState, setDataState] = React.useState<D[]>(data);

  const skipPageResetRef = React.useRef<boolean>();

  useEffect(() => {
    // After the table has updated, always remove the flag
    skipPageResetRef.current = false;
  });

  const {
    headerGroups,
    state,
    selectedFlatRows,
    page,
    rows,
    pageCount,
    gotoPage,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    setGlobalFilter,
    setFilter,
    dispatch,
  } = useTable(
    {
      columns: tableColumns,
      data: dataState,
      globalFilter,
      initialState,
      autoResetSortBy: !skipPageResetRef.current,
      autoResetSelectedRows: !skipPageResetRef.current,
      autoResetFilters: !skipPageResetRef.current,
      getRowId: useCallback((row: D, relativeIndex: number) => {
        return row.id ? row.id : `${relativeIndex}`;
      }, []),
    },
    useFilters,
    useGlobalFilter,
    useFlexLayout,
    useSortBy,
    useExpanded,
    useRowSelect,
    usePagination
  );

  const resetSelectedRows = useCallback(() => {
    dispatch({ type: actions.resetSelectedRows });
  }, [dispatch]);

  useEffect(() => {
    gotoPage(0);
  }, [gotoPage, state.sortBy, state.filters, state.globalFilter]);

  useEffect(() => {
    onSortedColChange?.(state.sortBy[0]);
  }, [state.sortBy, onSortedColChange]);

  useEffect(() => {
    const updateData = (newData: D[]) => {
      // When data gets updated with this function, set a flag to disable all of the auto resetting
      skipPageResetRef.current = true;

      setDataState(newData);
    };

    updateData(data);
  }, [data]);

  const renderTableHead = (headerGroup: HeaderGroup<D>, index: number) => (
    <div
      {...headerGroup.getHeaderGroupProps()}
      className={classNames(styles.header, {
        [styles.mainHeaderReset]: renderMainHeader && !styleMainHeader && index === 0,
        [styles.mainHeader]: renderMainHeader && styleMainHeader && index === 0,
      })}
    >
      {headerGroup.headers.map((column) => (
        <div
          {...column.getHeaderProps(column.getSortByToggleProps())}
          className={classNames({
            [styles.headerCell]: !renderMainHeader || styleMainHeader || index !== 0,
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
              <IconArrowLeft
                className={classNames(styles.sortArrow, {
                  [styles.sortArrowDown]: !column.isSortedDesc,
                })}
                size="m"
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
          [styles.isSelected]: row.isSelected && !loading,
        })}
      >
        <div {...row.getRowProps()}>
          {row.cells.map((cell) => (
            <div
              {...cell.getCellProps()}
              className={classNames(styles.tableCell, {
                [styles.selector]: cell.column.id === SELECTOR,
                [styles.radioSelector]: cell.column.id === RADIO_SELECTOR,
                [styles.expander]: cell.column.id === EXPANDER,
              })}
            >
              {loading ? <div className={styles.placeholder} /> : cell.render('Cell')}
            </div>
          ))}
        </div>
        {renderSubComponent && row.isExpanded && <div className={styles.subComponent}>{renderSubComponent(row)}</div>}
      </div>
    );
  };

  const renderEmptyBody = () => {
    let emptyBodyContent: React.ReactNode = renderEmptyStateRow?.();

    if (state.globalFilter) emptyBodyContent = t('common.table.noMatches');
    if (loading) emptyBodyContent = <div className={styles.placeholder} />;

    return (
      <div className={styles.rowWrapper} role="row">
        <div className={styles.tableCell}>{emptyBodyContent}</div>
      </div>
    );
  };

  const renderTableTools = (fn?: TableToolsFn<D>) => {
    return fn?.(
      {
        ...state,
        selectedRows: selectedFlatRows.map((row) => row.original),
      },
      { setGlobalFilter, setFilter, resetSelectedRows }
    );
  };

  return (
    <div className={className}>
      {renderTableTools(renderTableToolsTop)}
      <div className={styles.tableWrapper}>
        <div
          {...getTableProps()}
          className={classNames(styles.table, styles[theme], {
            [styles.noMainHeader]: !renderMainHeader,
          })}
        >
          <div className={styles.stickyHeaders}>{headerGroups.map(renderTableHead)}</div>
          <div {...getTableBodyProps()}>
            {(renderPaginator ? page : rows).map(renderTableBody)}
            {rows.length === 0 && renderEmptyBody()}
          </div>
        </div>
      </div>
      {renderPaginator?.({
        pageCount,
        pageIndex: state.pageIndex,
        goToPage: gotoPage,
      })}
      {renderTableTools(renderTableToolsBottom)}
    </div>
  );
};

export default Table;
