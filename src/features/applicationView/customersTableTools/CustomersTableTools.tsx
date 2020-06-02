import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button, TextInput } from 'hds-react';

import Select from '../../../common/select/Select';
import styles from './customersTableTools.module.scss';

export interface CustomersTableToolsProps<T> {
  className?: string;
  searchVal: string | undefined;
  searchBy: T;
  searchByOptions: Array<{ value: T; label: string }>;
  setSearchVal(val: string): void;
  setSearchBy(val: T): void;
  handleLinkCustomer?(): void;
  handleCreateCustomer(): void;
}

const CustomersTableTools = <T extends string>({
  className,
  searchVal,
  searchBy,
  searchByOptions,
  setSearchVal,
  setSearchBy,
  handleLinkCustomer,
  handleCreateCustomer,
}: CustomersTableToolsProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(styles.customersTableTools, className)}>
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
      <Button theme="coat" disabled={!handleLinkCustomer} onClick={handleLinkCustomer}>
        {t('applicationView.customerTableTools.linkCustomer')}
      </Button>
      <Button variant="secondary" theme="black" onClick={handleCreateCustomer}>
        {t('applicationView.customerTableTools.createNewCustomer')}
      </Button>
    </div>
  );
};

export default CustomersTableTools;
