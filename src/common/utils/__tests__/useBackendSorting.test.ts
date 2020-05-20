import { renderHook, act } from '@testing-library/react-hooks';

import { useBackendSorting } from '../useBackendSorting';

describe('useBackendSorting', () => {
  describe('handleSortByChange', () => {
    it('should set "orderBy" to the corresponding value in "sortByOrderByMap" for ascending order', () => {
      const { result } = renderHook(() => useBackendSorting());

      const sortByOrderByMap = { name: 'firstName' };
      const onSortByChange = result.current.handleSortByChange(sortByOrderByMap);

      act(() => onSortByChange({ id: 'name', desc: false }));

      expect(result.current.orderBy).toBe('firstName');
    });

    it('should set "orderBy" to the corresponding value in "sortByOrderByMap" prefixed by "-" for ascending order', () => {
      const { result } = renderHook(() => useBackendSorting());

      const sortByOrderByMap = { name: 'firstName' };
      const onSortByChange = result.current.handleSortByChange(sortByOrderByMap);

      act(() => onSortByChange({ id: 'name', desc: true }));

      expect(result.current.orderBy).toBe('-firstName');
    });

    it('should set "orderBy" to undefined if there is no corresponding value in "sortByOrderByMap"', () => {
      const { result } = renderHook(() => useBackendSorting());

      const sortByOrderByMap = { name: 'firstName' };
      const onSortByChange = result.current.handleSortByChange(sortByOrderByMap);

      act(() => onSortByChange({ id: 'random', desc: true }));

      expect(result.current.orderBy).toBeUndefined();
    });

    it('should set "orderBy" to undefined if "sortBy" is undefined', () => {
      const { result } = renderHook(() => useBackendSorting());

      const sortByOrderByMap = { name: 'firstName' };
      const onSortByChange = result.current.handleSortByChange(sortByOrderByMap);

      act(() => onSortByChange(undefined));

      expect(result.current.orderBy).toBeUndefined();
    });
  });

  describe('onOrderByChange', () => {
    const onOrderByChange = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should call the provided "onOrderByChange" after "orderBy" gets updated', () => {
      const { result } = renderHook(() => useBackendSorting(onOrderByChange));

      const sortByOrderByMap = { name: 'firstName' };
      const onSortByChange = result.current.handleSortByChange(sortByOrderByMap);

      act(() => onSortByChange({ id: 'name', desc: false }));
      expect(onOrderByChange).toHaveBeenCalledTimes(1);

      act(() => onSortByChange({ id: 'name', desc: true }));
      expect(onOrderByChange).toHaveBeenCalledTimes(2);
    });

    it('should not call the provided "onOrderByChange" if "orderBy" is not updated', () => {
      const { result } = renderHook(() => useBackendSorting(onOrderByChange));

      const sortByOrderByMap = { name: 'firstName' };
      const onSortByChange = result.current.handleSortByChange(sortByOrderByMap);

      act(() => onSortByChange(undefined));
      expect(onOrderByChange).not.toHaveBeenCalled();
    });
  });
});
