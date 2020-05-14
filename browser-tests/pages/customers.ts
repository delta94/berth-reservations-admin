import { Selector } from 'testcafe';

export const customers = {
  customerList: {
    firstCustomerLink: Selector('div[class^="customersPage"] div[class^="table_rowWrapper"]:first-of-type a'),
  },
  customerDetails: {
    firstDataLabel: Selector(
      'div[class^="individualCustomerPage"] div[class^="labelValuePair_"]:first-of-type span:nth-of-type(2)'
    ).nth(0),
  },
};
