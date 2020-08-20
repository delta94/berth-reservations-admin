import { Selector } from 'testcafe';

export const navigation = {
  sidebarContainer: Selector('div[class^="sidebar_mainWrapper"]'),
  harbors: Selector('a[class^="internalNavLink_"][href^="/harbors"]'),
  winterStorageAreas: Selector('a[class^="internalNavLink_"][href^="/winter-storage-areas"]'),
  applications: Selector('a[class^="internalNavLink_"][href^="/applications"]'),
  winterStorageApplications: Selector('a[class^="internalNavLink_"][href^="/winter-storage-applications"]'),
  customers: Selector('a[class^="internalNavLink_"][href^="/customers"]'),
  pricing: Selector('a[class^="internalNavLink_"][href^="/pricing"]'),
};
