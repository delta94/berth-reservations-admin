import { Selector } from 'testcafe';

export const customers = {
  customerList: {
    firstCustomerLink: Selector('div[class^="pageContent"] div[class^="table_rowWrapper"]:first-of-type a'),
    selectAllToggle: Selector('div[class^="table_headerCell"] div input[type^="checkbox"]'),
    selectFirstCustomer: Selector('div[class^="table_rowWrapper"] div input[type^="checkbox"]').nth(0),
    selectedCount: Selector('div[class^="customerListTableTools_tableToolsLeft"] span[class^="text_gray"]'),
    deselectAll: Selector('div[class^="customerListTableTools_tableToolsLeft"] button:last-of-type'),
    paginationNextButton: Selector('ul[class^="pagination"] li[class^="pagination_nextBtn"] a'),
  },
  customerView: {
    firstDataLabel: Selector(
      'div[class^="customerView"] div[class^="labelValuePair_"]:first-of-type span:nth-of-type(2)'
    ).nth(0),
  },
};
