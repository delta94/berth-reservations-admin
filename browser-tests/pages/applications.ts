import { Selector } from 'testcafe';

export const applications = {
  applicationList: {
    firstApplicationLink: Selector('div[class^="applicationListPage"] div[class^="table_rowWrapper"]:first-of-type a'),
  },
  applicationView: {
    firstName: Selector(
      'div[class^="applicationViewPage"] div[class^="labelValuePair_"]:first-of-type span:nth-of-type(2)'
    ).nth(0),
  },
};
