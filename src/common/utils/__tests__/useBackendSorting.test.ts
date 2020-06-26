import { renderHook, act } from '@testing-library/react-hooks';

import { useBackendSorting } from '../useBackendSorting';

describe('useBackendSorting', () => {
  describe('handleSortedColChange', () => {
    it('should set "orderBy" to the corresponding value in "colIdOrderByMap" for ascending order', () => {
      const { result } = renderHook(() => useBackendSorting());

      const colIdOrderByMap = { name: 'firstName' };
      const onSortedColChange = result.current.handleSortedColChange(colIdOrderByMap);

      act(() => onSortedColChange({ id: 'name', desc: false }));

      expect(result.current.orderBy).toBe('firstName');
    });

    it(
      'should set "orderBy" to the corresponding value in "colIdOrderByMap" ' +
        'prefixed with "-" for descending order',
      () => {
        const { result } = renderHook(() => useBackendSorting());

        const colIdOrderByMap = { name: 'firstName' };
        const onSortedColChange = result.current.handleSortedColChange(colIdOrderByMap);

        act(() => onSortedColChange({ id: 'name', desc: true }));

        expect(result.current.orderBy).toBe('-firstName');
      }
    );

    it('should set "orderBy" to undefined if there is no corresponding value in "colIdOrderByMap"', () => {
      const { result } = renderHook(() => useBackendSorting());

      const colIdOrderByMap = { name: 'firstName' };
      const onSortedColChange = result.current.handleSortedColChange(colIdOrderByMap);

      act(() => onSortedColChange({ id: 'random', desc: true }));

      expect(result.current.orderBy).toBeUndefined();
    });

    it('should set "orderBy" to undefined if "sortedCol" is undefined', () => {
      const { result } = renderHook(() => useBackendSorting());

      const colIdOrderByMap = { name: 'firstName' };
      const onSortedColChange = result.current.handleSortedColChange(colIdOrderByMap);

      act(() => onSortedColChange(undefined));

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

      const colIdOrderByMap = { name: 'firstName' };
      const onSortedColChange = result.current.handleSortedColChange(colIdOrderByMap);

      act(() => onSortedColChange({ id: 'name', desc: false }));
      expect(onOrderByChange).toHaveBeenCalledTimes(1);

      act(() => onSortedColChange({ id: 'name', desc: true }));
      expect(onOrderByChange).toHaveBeenCalledTimes(2);
    });

    it('should not call the provided "onOrderByChange" if "orderBy" is not updated', () => {
      const { result } = renderHook(() => useBackendSorting(onOrderByChange));

      const colIdOrderByMap = { name: 'firstName' };
      const onSortedColChange = result.current.handleSortedColChange(colIdOrderByMap);

      act(() => onSortedColChange(undefined));
      expect(onOrderByChange).not.toHaveBeenCalled();
    });
  });
});
