import React from 'react';
import { HashRouter } from 'react-router-dom';

import InternalNavLink from './InternalNavLink';

export default {
  component: InternalNavLink,
  decorators: [storyFn => <HashRouter>{storyFn()}</HashRouter>],
  title: 'InternalNavLink',
};

export const internalNavLink = () => (
  <InternalNavLink to="/">Home</InternalNavLink>
);

internalNavLink.story = {
  name: 'Default',
};
