import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './tableHeader.module.scss';

interface Tab {
  label: string;
  value: string;
  enabled: boolean;
}
export interface TableHeaderProps {
  activeFilters?: string[];
  filters: Tab[];
  filterPrefix?: string;
  handleSetFilter(filter?: string): void;
}

const TableHeader: React.SFC<TableHeaderProps> = ({
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
        [styles.active]: activeFilters?.includes(filter.label),
        [styles.disabled]: !filter.enabled,
      })}
      disabled={!filter.enabled}
      onClick={() => handleSetFilter(filter.label)}
    >
      {`${filterPrefix} ${filter.label}`}
    </button>
  ));

  const noActiveFilter =
    filters.filter(filterVal => activeFilters?.includes(filterVal.label))
      .length === 0;

  return (
    <>
      <button
        className={classNames(styles.filterBtn, {
          [styles.active]: noActiveFilter,
        })}
        onClick={() => handleSetFilter()}
      >
        {t('common.table.all')}
      </button>
      {filtersButtons}
    </>
  );
};

export default TableHeader;
