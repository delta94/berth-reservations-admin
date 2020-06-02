import React from 'react';

import HarborViewPage from './HarborViewPage';

export default {
  component: HarborViewPage,
  title: 'HarborViewPage',
};

export const harborViewPage = () => <HarborViewPage />;

harborViewPage.story = {
  name: 'Default',
};
