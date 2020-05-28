import { getSelectedRowIds } from './getSelectedRowIds';

describe('getSelectedRowIds', () => {
  it('should get selected rowids', () => {
    const selectedRows = { '1': true, '2': true, '3': false };
    expect(getSelectedRowIds(selectedRows)).toEqual(['1', '2']);
  });
});
