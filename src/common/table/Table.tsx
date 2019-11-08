import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  useTable,
  useExpanded,
  useSortBy,
  useRowSelect,
  /* eslint-disable */
  // For some reason eslint import plugin is unable to detect the following types
  TableOptions,
  HeaderProps,
  Row,
  HeaderGroup,
  Column,
  /* eslint-enable */
} from 'react-table';

import Icon from '../../common/icon/Icon';
import Checkbox from '../checkbox/Checkbox';
import styles from './table.module.scss';

type Data = object;
type Props = {
  canSelectRows?: boolean;
  renderSubComponent?: (row: Row) => React.ReactNode;
  renderMainHeader?: (props: HeaderProps<Data>) => React.ReactNode;
} & TableOptions<Data>;

const EXPANDER = 'EXPANDER';
const MAIN_HEADER = 'MAIN_HEADER';
const SELECTOR = 'SELECTOR';

const Table = ({
  columns,
  data: harborsData,
  canSelectRows,
  renderSubComponent,
  renderMainHeader,
}: Props) => {
  const { t } = useTranslation();

  const selectorCol: Column<Data> = {
    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <Checkbox {...getToggleAllRowsSelectedProps()} />
    ),
    id: SELECTOR,
  };

  const expanderCol: Column<Data> = {
    Cell: ({ row }) => (
      <div {...row.getExpandedToggleProps()} className={styles.expander}>
        <Icon name={row.isExpanded ? 'angleDown' : 'angleLeft'} />
      </div>
    ),
    Header: ({ state, toggleExpandedByPath }) => (
      <div
        className={styles.expanderHeader}
        onClick={() =>
          state.expanded.forEach(path => toggleExpandedByPath([path], false))
        }
      >
        {t('common.table.minimizeAll')}
      </div>
    ),
    id: EXPANDER,
  };

  const tableColumns = React.useMemo(() => {
    const headers = [
      ...(canSelectRows ? [selectorCol] : []),
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
    columns,
    renderSubComponent,
    renderMainHeader,
    selectorCol,
    expanderCol,
  ]);

  const data = React.useMemo(() => harborsData, [harborsData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    flatColumns,
  } = useTable(
    {
      columns: tableColumns,
      data,
    },
    useSortBy,
    useExpanded,
    useRowSelect
  );

  const renderTableHead = (headerGroup: HeaderGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        <th
          {...column.getHeaderProps(column.getSortByToggleProps())}
          className={classNames(styles.tableHeader, {
            [styles.mainHeader]: renderMainHeader && column.depth === 0,
          })}
        >
          {column.render('Header')}
          {column.isSorted && (
            <Icon name={column.isSortedDesc ? 'arrowDown' : 'arrowUp'} />
          )}
        </th>
      ))}
    </tr>
  );

  const renderTableBody = (row: Row) => {
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
            <td {...cell.getCellProps()} className={styles.tableData}>
              <div
                className={classNames(styles.tableCell, {
                  [styles.selector]: cell.column.id === SELECTOR,
                })}
              >
                {cell.render('Cell')}
              </div>
            </td>
          ))}
        </tr>
        {renderSubComponent && row.isExpanded && (
          <tr>
            <td colSpan={flatColumns.length}>{renderSubComponent(row)}</td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>{headerGroups.map(renderTableHead)}</thead>
      <tbody {...getTableBodyProps()}>{rows.map(renderTableBody)}</tbody>
    </table>
  );
};

export default Table;
