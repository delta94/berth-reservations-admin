import React from 'react';

import Header from './Header';
import HelsinkiLogo from '../helsinkiLogo/HelsinkiLogo';

export default {
  component: Header,
  title: 'Header',
};

export const header = () => (
  <Header>
    <HelsinkiLogo />
  </Header>
);

header.story = {
  name: 'Default',
};
