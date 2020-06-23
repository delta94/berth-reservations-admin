import { Selector } from 'testcafe';

export const winterStorageAreas = {
  winterStorageAreaList: {
    firstWinterStorageArea: Selector(
      'div[class^="pageContent"] div[class^="table_rowWrapper"]:first-of-type div[class^="table_tableCell"]:nth-of-type(2)'
    ),
  },
};
