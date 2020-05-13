import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './tableFilters.module.scss';

interface Tab<T> {
  label: string;
  value: T;
  disabled?: boolean;
}
export interface TableFiltersProps<T = string | number | boolean> {
  activeFilters?: T[];
  filters: Tab<T>[];
  filterPrefix?: string;
  handleSetFilter(filter?: T): void;
}

const TableFilters: React.SFC<TableFiltersProps> = ({
  activeFilters, // Note: this filters might include other active filters from the table
  filters,
  filterPrefix = '',
  handleSetFilter,
}) => {
  const { t } = useTranslation();

  const filtersButtons = filters.map((filter, i) => (
    <button
      key={i}
      className={classNames(styles.filterBtn, {
        [styles.active]: activeFilters?.includes(filter.value),
        [styles.disabled]: filter.disabled,
      })}
      disabled={filter.disabled}
      onClick={() => handleSetFilter(filter.value)}
    >
      {`${filterPrefix} ${filter.label}`}
    </button>
  ));

  const hasNoActiveFilters = filters.filter((filterVal) => activeFilters?.includes(filterVal.value)).length === 0;

  return (
    <>
      <button
        className={classNames(styles.filterBtn, {
          [styles.active]: hasNoActiveFilters,
        })}
        onClick={() => handleSetFilter()}
      >
        {t('common.table.all')}
      </button>
      {filtersButtons}
    </>
  );
};

export default TableFilters;
