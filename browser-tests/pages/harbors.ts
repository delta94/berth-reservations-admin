import { Selector } from 'testcafe';

export const harbors = {
  harborList: {
    firstHarborLink: Selector('div[class^="harborListPage"] div[class^="table_rowWrapper"]:first-of-type a'),
  },
  harborDetails: {
    address: Selector(
      'div[class^="individualHarborPage"] div[class^="harborProperties_details"]:first-of-type span[class^="text_standard"]'
    ),
  },
};
