import React from 'react';
import { HashRouter } from 'react-router-dom';

import Page from './Page';

export default {
  component: Page,
  decorators: [storyFn => <HashRouter>{storyFn()}</HashRouter>],

  title: 'Page',
};

const content = (
  <div style={{ backgroundColor: 'lightgrey', height: '100%' }}>content</div>
);

export const page = () => <Page>{content}</Page>;

page.story = {
  name: 'Default',
};
