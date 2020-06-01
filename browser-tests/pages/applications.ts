import { Selector } from 'testcafe';

export const applications = {
  applicationList: {
    firstApplicationLink: Selector('div[class^="applicationListPage"] div[class^="table_rowWrapper"]:first-of-type a'),
  },
  applicationDetails: {
    firstName: Selector(
      'div[class^="individualApplicationPage"] div[class^="labelValuePair_"]:first-of-type span:nth-of-type(2)'
    ).nth(0),
  },
};
