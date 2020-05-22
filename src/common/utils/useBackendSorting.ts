import { useEffect, useState } from 'react';

import { usePrevious } from './usePrevious';

interface SortBy {
  id: string;
  desc?: boolean;
}

export const useBackendSorting = (onOrderByChange?: Function) => {
  const [orderBy, setOrderBy] = useState<string>();

  // colId: the id of the column to be sorted in the table
  // orderBy: the value sent to the backend for sorted results
  // colIdOrderByMap: a record for mapping column's Id to orderBy, e.g: { name: 'firstName', data: 'createdAt' }
  const handleSortedColChange = (colIdOrderByMap: Record<string, string>) => (colId: SortBy | undefined) => {
    const sortById = colId?.id && colIdOrderByMap[colId.id];
    const orderBy = sortById ? (colId?.desc ? `-${sortById}` : sortById) : undefined;

    setOrderBy(orderBy);
  };

  const prevOrderBy = usePrevious(orderBy);

  useEffect(() => {
    if (prevOrderBy !== orderBy) {
      onOrderByChange?.();
    }
  }, [prevOrderBy, orderBy, onOrderByChange]);

  return {
    orderBy,
    handleSortedColChange,
  };
};
