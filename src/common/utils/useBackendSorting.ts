import { useEffect, useState } from 'react';

import { usePrevious } from './usePrevious';

interface SortBy {
  id: string;
  desc?: boolean;
}

export const useBackendSorting = (onOrderByChange?: Function) => {
  const [orderBy, setOrderBy] = useState<string>();

  // sortBy: the id of the column to be sorted in the table
  // orderBy: the value sent to the backend for sorted results
  // sortByOrderByMap: is a record for mapping sortBy to orderBy, e.g: { name: 'firstName', data: 'createdAt' }
  const handleSortByChange = (sortByOrderByMap: Record<string, string>) => (sortBy: SortBy | undefined) => {
    const sortById = sortBy?.id && sortByOrderByMap[sortBy.id];
    const orderBy = sortById ? (sortBy?.desc ? `-${sortById}` : sortById) : undefined;

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
    handleSortByChange,
  };
};
