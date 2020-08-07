import { getFilteredCustomersData } from '../utils';
import { mockFilteredCustomers } from '../__fixtures__/mockData';
import { FILTERED_CUSTOMERS } from '../__generated__/FILTERED_CUSTOMERS';

describe('utils', () => {
  describe('getFilteredCustomersData', () => {
    it('should map filtered customers data', () => {
      expect(getFilteredCustomersData(mockFilteredCustomers)).toMatchSnapshot();
    });

    it('should return an empty array when there are no customers', () => {
      const testData: FILTERED_CUSTOMERS = {
        profiles: {
          __typename: 'ProfileNodeConnection',
          count: 0,
          edges: [],
        },
      };
      expect(getFilteredCustomersData(testData)).toEqual([]);
    });
  });
});
