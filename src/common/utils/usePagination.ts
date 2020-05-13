import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

const PAGE_SIZE = 10;

export const usePagination = (pageSize = PAGE_SIZE) => {
  const history = useHistory();

  const urlSearchParams = new URLSearchParams(history.location.search);
  const pageParam = Number(urlSearchParams.get('page') ?? 1);
  const pageIndex = !Number.isNaN(pageParam) ? pageParam - 1 : 0;
  const cursorIndex = pageIndex * pageSize;
  const cursor = cursorIndex > 0 ? btoa(`arrayconnection:${cursorIndex - 1}`) : undefined;

  const getPageCount = (connectionsCount: number | null | undefined) =>
    connectionsCount ? Math.ceil(connectionsCount / pageSize) : 1;

  const goToPage = useCallback((pageIndex: number) => history.push(`?page=${pageIndex + 1}`), [history]);

  return {
    cursor,
    pageIndex,
    pageSize,
    getPageCount,
    goToPage,
  };
};
