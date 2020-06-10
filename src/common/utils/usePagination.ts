import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { History } from 'history';

const PAGE_SIZE = 10;

export const usePagination = (pageSize = PAGE_SIZE) => {
  const history = useHistory();
  const pageParam = getCurrentPageParam(history);
  const pageIndex = !Number.isNaN(pageParam) ? pageParam - 1 : 0;
  const cursorIndex = pageIndex * pageSize;
  const cursor = cursorIndex > 0 ? btoa(`arrayconnection:${cursorIndex - 1}`) : undefined;

  const getPageCount = (connectionsCount: number | null | undefined) =>
    connectionsCount ? Math.ceil(connectionsCount / pageSize) : 1;

  const goToPage = useCallback(
    (pageIndex: number) => {
      const newPageNumber = pageIndex + 1;
      const currentPageNumber = getCurrentPageParam(history);

      if (currentPageNumber !== newPageNumber) {
        history.push({ search: `?page=${newPageNumber}` });
      }
    },
    [history]
  );

  return {
    cursor,
    pageIndex,
    pageSize,
    getPageCount,
    goToPage,
  };
};

const getCurrentPageParam = (history: History<History.LocationState>): number => {
  const urlSearchParams = new URLSearchParams(history.location.search);
  return Number(urlSearchParams.get('page') ?? 1);
};
