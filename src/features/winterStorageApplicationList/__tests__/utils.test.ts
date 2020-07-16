import { getWinterStorageApplicationData } from '../utils';
import { winterStorageApplicationMockData } from '../__fixtures__/mockData';

describe('winterStorageApplicationList utils', () => {
  describe('getWinterStorageApplicationData', () => {
    it('correctly parses response data', () => {
      const applications = getWinterStorageApplicationData(winterStorageApplicationMockData);
      expect(applications).toMatchSnapshot();
    });
  });
});
