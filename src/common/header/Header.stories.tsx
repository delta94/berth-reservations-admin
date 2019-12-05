import React from 'react';

import Header from './Header';
import Icon from '../icon/Icon';

export default {
  component: Header,
  title: 'Header',
};

const HelsinkiLogo = () => (
  <Icon name="helsinkiLogo" size="large" rectangle={true} color="white" />
);

export const header = () => (
  <Header>
    <HelsinkiLogo />
  </Header>
);

header.story = {
  name: 'Default',
};
