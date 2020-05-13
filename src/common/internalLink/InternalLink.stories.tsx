import React from 'react';
import { HashRouter } from 'react-router-dom';

import InternalLink from './InternalLink';

export default {
  component: InternalLink,
  decorators: [(storyFn) => <HashRouter>{storyFn()}</HashRouter>],
  title: 'InternalLink',
};

export const internalLink = () => <InternalLink to="/">Home Page</InternalLink>;

internalLink.story = {
  name: 'Default',
};

export const underlined = () => (
  <InternalLink to="/" underlined>
    Home Page
  </InternalLink>
);

export const standardColor = () => (
  <InternalLink to="/" color="standard">
    Home Page
  </InternalLink>
);

export const criticalColor = () => (
  <InternalLink to="/" color="critical">
    Home Page
  </InternalLink>
);
