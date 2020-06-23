import { Selector } from 'testcafe';

export const applications = {
  applicationList: {
    firstApplicationLink: Selector('div[class^="applicationList"] div[class^="table_rowWrapper"]:first-of-type a'),
  },
  applicationView: {
    firstName: Selector(
      'div[class^="applicationView"] div[class^="labelValuePair_"]:first-of-type span:nth-of-type(2)'
    ).nth(0),
  },
};
