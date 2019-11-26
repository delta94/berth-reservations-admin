import React from 'react';
import { HashRouter } from 'react-router-dom';

import HelsinkiLogo from './HelsinkiLogo';

export default {
  component: HelsinkiLogo,
  decorators: [storyFn => <HashRouter>{storyFn()}</HashRouter>],
  title: 'HelsinkiLogo',
};

export const helsinkiLogo = () => (
  <>
    <HelsinkiLogo size="small" />
    <HelsinkiLogo />
    <HelsinkiLogo size="large" />
  </>
);

helsinkiLogo.story = {
  name: 'Default',
};

export const withBrandColor = () => <HelsinkiLogo color="brand" />;
