import { renderHook } from '@testing-library/react-hooks';

import { usePrevious } from '../usePrevious';

describe('usePrevious', () => {
  it('should return undefined for the first run', () => {
    const { result } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    expect(result.current).toBeUndefined();
  });

  it('should return the previous value', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    rerender({ value: 1 });

    expect(result.current).toBe(0);
  });
});
