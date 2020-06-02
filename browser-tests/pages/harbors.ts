import { Selector } from 'testcafe';

export const harbors = {
  harborList: {
    firstHarborLink: Selector('div[class^="harborListPage"] div[class^="table_rowWrapper"]:first-of-type a'),
  },
  harborView: {
    address: Selector(
      'div[class^="harborViewPage"] div[class^="harborProperties_details"]:first-of-type span[class^="text_standard"]'
    ),
  },
};
