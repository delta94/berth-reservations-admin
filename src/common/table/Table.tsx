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
  CellProps,
  Row,
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
  const tableColumns = React.useMemo(() => {
    const selectorCol = {
      Cell: ({ row }: CellProps<Data>) => (
        <Checkbox {...row.getToggleRowSelectedProps()} />
      ),
      Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<Data>) => (
        <Checkbox {...getToggleAllRowsSelectedProps()} />
      ),
      id: SELECTOR,
    };
    const expanderCol = {
      Cell: ({ row }: CellProps<Data>) => (
        <div {...row.getExpandedToggleProps()} className={styles.expander}>
          <Icon name={row.isExpanded ? 'angleDown' : 'angleLeft'} />
        </div>
      ),
      Header: (props: HeaderProps<Data>) => (
        <div
          className={styles.expanderHeader}
          onClick={() =>
            props.state.expanded.forEach(path =>
              props.toggleExpandedByPath([path], false)
            )
          }
        >
          {t('common.table.minimizeAll')}
        </div>
      ),
      id: EXPANDER,
    };
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
  }, [canSelectRows, columns, t, renderSubComponent, renderMainHeader]);

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

  return (
    <>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
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
                    <Icon
                      name={column.isSortedDesc ? 'arrowDown' : 'arrowUp'}
                      className={styles.arrow}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <React.Fragment key={row.index}>
                <tr
                  {...row.getRowProps()}
                  className={classNames(styles.tableRow, {
                    [styles.selected]: row.isSelected,
                  })}
                >
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} className={styles.tableData}>
                        <div
                          className={classNames(styles.tableCell, {
                            [styles.selector]: cell.column.id === SELECTOR,
                          })}
                        >
                          {cell.render('Cell')}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                {renderSubComponent && row.isExpanded && (
                  <tr>
                    <td colSpan={flatColumns.length}>
                      {renderSubComponent(row)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
