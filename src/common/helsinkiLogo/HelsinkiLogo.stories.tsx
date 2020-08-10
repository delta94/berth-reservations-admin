import React from 'react';

import HelsinkiLogo from './HelsinkiLogo';

export default {
  component: HelsinkiLogo,
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
