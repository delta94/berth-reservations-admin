import { Selector } from 'testcafe';

export const harbors = {
  harborList: {
    firstHarborLink: Selector('div[class^="pageContent"] div[class^="table_rowWrapper"]:first-of-type a'),
  },
  harborView: {
    address: Selector(
      'div[class^="pageContent"] div[class^="harborCard_details"]:first-of-type span[class^="text_standard"]'
    ),
  },
};
