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

    it('should remove the edges with a value of null', () => {
      const testData: FILTERED_CUSTOMERS = {
        profiles: {
          __typename: 'ProfileNodeConnection',
          count: 0,
          edges: [null],
        },
      };
      expect(getFilteredCustomersData(testData)).toEqual(expect.not.arrayContaining([null]));
    });

    it('should remove the nodes with a value of null', () => {
      const testData: FILTERED_CUSTOMERS = {
        profiles: {
          __typename: 'ProfileNodeConnection',
          count: 0,
          edges: [
            {
              __typename: 'ProfileNodeEdge',
              node: null,
            },
          ],
        },
      };
      expect(getFilteredCustomersData(testData)).toEqual(expect.not.arrayContaining([null]));
    });
  });
});
