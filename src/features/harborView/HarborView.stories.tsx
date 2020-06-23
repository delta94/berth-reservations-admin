import React from 'react';

import HarborView from './HarborView';

export default {
  component: HarborView,
  title: 'HarborView',
};

export const harborView = () => <HarborView>Harbor view</HarborView>;

harborView.story = {
  name: 'Default',
};
