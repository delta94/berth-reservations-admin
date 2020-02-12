import React from 'react';

import Header from './Header';
import { IconHelsinkiLogo } from '../icons';

export default {
  component: Header,
  title: 'Header',
};

const HelsinkiLogo = () => <IconHelsinkiLogo />;

export const header = () => (
  <Header>
    <HelsinkiLogo />
  </Header>
);

header.story = {
  name: 'Default',
};
