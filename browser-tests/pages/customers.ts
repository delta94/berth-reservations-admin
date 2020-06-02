import { Selector } from 'testcafe';

export const customers = {
  customerList: {
    firstCustomerLink: Selector('div[class^="customerListPage"] div[class^="table_rowWrapper"]:first-of-type a'),
  },
  customerView: {
    firstDataLabel: Selector(
      'div[class^="customerViewPage"] div[class^="labelValuePair_"]:first-of-type span:nth-of-type(2)'
    ).nth(0),
  },
};
