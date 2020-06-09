import { renderHook } from '@testing-library/react-hooks';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { usePagination } from '../usePagination';

describe('usePagination', () => {
  let history: MemoryHistory;

  const getWrapper = (initialRoute: string) => {
    history = createMemoryHistory({ initialEntries: [initialRoute] });
    const Wrapper: React.FC = ({ children }) => <Router history={history}>{children}</Router>;

    return Wrapper;
  };

  describe('cursor', () => {
    it('should return a value of undefined for the first page', () => {
      const pageNumber = 1;
      const { result } = renderHook(() => usePagination(10), {
        wrapper: getWrapper(`/?page=${pageNumber}`),
      });

      expect(result.current.cursor).toBeUndefined();
    });

    it('should return a base-64 encoded value of "arrayconnection:<cursorIndex>" for other pages', () => {
      const { result } = renderHook(() => usePagination(10), {
        wrapper: getWrapper('/?page=3'),
      });

      const decodedCursor = atob(result.current.cursor as string);

      expect(decodedCursor).toMatch(/^arrayconnection:\d+$/);
    });

    it("should give <cursorIndex> the value of the last item's index in the current page", () => {
      const pageSize = 10;
      const currentPage = 3;
      const { result } = renderHook(() => usePagination(pageSize), {
        wrapper: getWrapper(`/?page=${currentPage}`),
      });

      const decodedCursor = atob(result.current.cursor as string);

      expect(decodedCursor).toEqual(expect.stringContaining('19'));
    });
  });

  describe('pageIndex', () => {
    it('should read the "page" param from the URL and return the same value minus 1', () => {
      const pageNumber = 3;
      const { result } = renderHook(() => usePagination(10), {
        wrapper: getWrapper(`/?page=${pageNumber}`),
      });

      expect(result.current.pageIndex).toBe(pageNumber - 1);
    });

    it('should return 0 if the "page" param is not specified in the URL', () => {
      const { result } = renderHook(() => usePagination(10), {
        wrapper: getWrapper(''),
      });

      expect(result.current.pageIndex).toBe(0);
    });

    it('should return 0 if the "page" param has non-numeric value', () => {
      const { result } = renderHook(() => usePagination(10), {
        wrapper: getWrapper('/?page=random'),
      });

      expect(result.current.pageIndex).toBe(0);
    });
  });

  describe('pageSize', () => {
    it('should give the page size a numeric default value if it is not provided as an argument', () => {
      const { result } = renderHook(() => usePagination(), {
        wrapper: getWrapper(''),
      });

      expect(typeof result.current.pageSize).toBe('number');
    });

    it('should give the page size the custom value which is provided as an argument', () => {
      const customPageSize = 15;
      const { result } = renderHook(() => usePagination(customPageSize), {
        wrapper: getWrapper(''),
      });

      expect(result.current.pageSize).toBe(customPageSize);
    });
  });

  describe('getPageCount', () => {
    it('should return the number of pages based on the connections count fetched from the query', () => {
      const pageSize = 5;
      const { result } = renderHook(() => usePagination(pageSize), {
        wrapper: getWrapper('/?page=3'),
      });

      expect(result.current.getPageCount(10)).toBe(2);
    });

    it('should return 1 if the provided count is less than the page size', () => {
      const pageSize = 5;
      const { result } = renderHook(() => usePagination(pageSize), {
        wrapper: getWrapper('/?page=3'),
      });

      expect(result.current.getPageCount(4)).toBe(1);
    });

    it('should return 1 if the provided count is zero, null or undefined', () => {
      const { result } = renderHook(() => usePagination(), {
        wrapper: getWrapper('/?page=3'),
      });

      expect(result.current.getPageCount(0)).toBe(1);
      expect(result.current.getPageCount(null)).toBe(1);
      expect(result.current.getPageCount(undefined)).toBe(1);
    });

    it('should return a whole number', () => {
      const pageSize = 5;
      const { result } = renderHook(() => usePagination(pageSize), {
        wrapper: getWrapper('/?page=3'),
      });

      expect(result.current.getPageCount(7)).toBe(2);
    });
  });

  describe('goToPage', () => {
    it('should add "page" param to the URL', () => {
      const pageIndex = 2;
      const { result } = renderHook(() => usePagination(), {
        wrapper: getWrapper(''),
      });

      result.current.goToPage(pageIndex);

      expect(history.location.search).toMatch(`?page=${pageIndex + 1}`);
    });

    it('should not push duplicate page history entries in a row', () => {
      const pageIndex = 2;
      const { result } = renderHook(() => usePagination(), {
        wrapper: getWrapper(''),
      });
      expect(history.length).toEqual(1);

      result.current.goToPage(pageIndex);
      expect(history.length).toEqual(2);

      result.current.goToPage(pageIndex);
      expect(history.length).toEqual(2);
    });
  });
});
