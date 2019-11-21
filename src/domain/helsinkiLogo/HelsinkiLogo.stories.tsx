import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import HelsinkiLogo from './HelsinkiLogo';

export default {
  component: HelsinkiLogo,
  title: 'HelsinkiLogo',
};

export const helsinkiLogo = () => (
  <Router>
    <HelsinkiLogo size="small" />
    <HelsinkiLogo />
    <HelsinkiLogo size="large" />
  </Router>
);

helsinkiLogo.story = {
  name: 'Default',
};

export const withBrandColor = () => (
  <Router>
    <HelsinkiLogo color="brand" />
  </Router>
);
