import React from 'react';
import { HashRouter } from 'react-router-dom';

import Header from './Header';

export default {
  component: Header,
  decorators: [storyFn => <HashRouter>{storyFn()}</HashRouter>],

  title: 'Header',
};

export const header = () => <Header />;

header.story = {
  name: 'Default',
};
