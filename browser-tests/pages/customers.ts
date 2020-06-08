import { Selector } from 'testcafe';

export const customers = {
  customerList: {
    firstCustomerLink: Selector('div[class^="customerListPage"] div[class^="table_rowWrapper"]:first-of-type a'),
    selectAllToggle: Selector('div[class^="table_headerCell"] span[class^="checkbox"]'),
    selectedCount: Selector('div[class^="customerListTableTools_tableToolsLeft"] span[class^="text_gray"]'),
    deselectAll: Selector('div[class^="customerListTableTools_tableToolsLeft"] button'),
    paginationNextButton: Selector('ul[class^="pagination"] li[class^="paginationNextBtn"] a'),
  },
  customerView: {
    firstDataLabel: Selector(
      'div[class^="customerViewPage"] div[class^="labelValuePair_"]:first-of-type span:nth-of-type(2)'
    ).nth(0),
  },
};
