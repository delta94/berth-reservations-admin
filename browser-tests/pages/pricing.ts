import { Selector } from 'testcafe';

export const pricing = {
  berthPrices: {
    firstPrivatePrice: Selector(
      'div[class^="pricingPage"] div[class^="table_rowWrapper"] div[class^="table_tableCell"]:nth-of-type(2)'
    ).nth(0),
    editPriceButton: Selector(
      'div[class^="pricingPage"] div[class^="table_rowWrapper"] button'
    ).nth(0),
    priceModal: {
      privatePrice: Selector('div[class^="ReactModal__Content"] #privateCustomer')
    }
  },
};
