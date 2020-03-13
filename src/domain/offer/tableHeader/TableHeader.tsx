import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './tableHeader.module.scss';

export interface TableHeaderProps {
  activeFilters?: string[];
  filters: string[];
  handleSetFilter(filter?: string): void;
}

const TableHeader: React.SFC<TableHeaderProps> = ({
  activeFilters, // Note: this filters might include other active filters from the table
  filters,
  handleSetFilter,
}) => {
  const { t } = useTranslation();

  const filtersButtons = filters.map((filter, i) => (
    <button
      key={i}
      className={classNames(styles.filterBtn, {
        [styles.active]: activeFilters?.includes(filter),
      })}
      onClick={() => handleSetFilter(filter)}
    >
      {t('offer.tableHeaders.pierFilterBtn', { pier: filter })}
    </button>
  ));

  const noActiveFilter =
    filters.filter(filterVal => activeFilters?.includes(filterVal)).length ===
    0;

  return (
    <>
      <button
        className={classNames(styles.filterBtn, {
          [styles.active]: noActiveFilter,
        })}
        onClick={() => handleSetFilter()}
      >
        {t('offer.tableHeaders.all')}
      </button>
      {filtersButtons}
    </>
  );
};

export default TableHeader;
