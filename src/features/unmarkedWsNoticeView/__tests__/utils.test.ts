import { mockData } from '../__fixtures__/mockData';
import { getWinterStorageApplicationDetailsData } from '../utils';

describe('unmarkedWsNoticeView utils', () => {
  describe('getWinterStorageApplicationDetailsData', () => {
    it('parses data correctly', () => {
      const winterStorageApplicationDetailsData = getWinterStorageApplicationDetailsData(
        mockData.winterStorageApplication,
        mockData.boatTypes
      );
      expect(winterStorageApplicationDetailsData).toMatchSnapshot();
    });
  });
});
