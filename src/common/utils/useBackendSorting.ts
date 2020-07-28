import { useEffect, useState } from 'react';

import { usePrevious } from './usePrevious';

export interface SortedCol {
  id: string;
  desc?: boolean;
}

export const useBackendSorting = (onOrderByChange?: Function) => {
  const [orderBy, setOrderBy] = useState<string>();

  // colId: the id of the column to be sorted in the table
  // orderBy: the value sent to the backend for sorted results
  // colIdOrderByMap: a record for mapping column's Id to orderBy, e.g: { name: 'firstName', data: 'createdAt' }
  const handleSortedColChange = (colIdOrderByMap: Record<string, string>) => (sortedCol: SortedCol | undefined) => {
    const colId = sortedCol?.id && colIdOrderByMap[sortedCol.id];
    const orderBy = colId ? (sortedCol?.desc ? `-${colId}` : colId) : undefined;

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
