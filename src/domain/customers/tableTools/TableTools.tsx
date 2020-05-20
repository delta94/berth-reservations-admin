import React from 'react';
import classNames from 'classnames';
import { TextInput } from 'hds-react';

import Select from '../../../common/select/Select';
import styles from './tableTools.module.scss';

export interface TableToolsProps<T> {
  className?: string;
  searchVal: string | undefined;
  searchBy: T;
  searchByOptions: Array<{ value: T; label: string }>;
  setSearchVal(val: string): void;
  setSearchBy(val: T): void;
}

const TableTools = <T extends string>({
  className,
  searchVal,
  searchBy,
  searchByOptions,
  setSearchVal,
  setSearchBy,
}: TableToolsProps<T>) => {
  return (
    <div className={classNames(styles.tableTools, className)}>
      <Select
        className={styles.select}
        onChange={(e) => setSearchBy(e.target.value as T)}
        value={searchBy}
        options={searchByOptions}
        required
      />
      <TextInput
        className={styles.searchInput}
        id="searchSimilarCustomers"
        value={searchVal}
        onChange={(e) => setSearchVal((e.target as HTMLInputElement).value)}
      />
    </div>
  );
};

export default TableTools;
