import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from 'hds-react';

import Sidebar from './Sidebar';
import Expandable from '../expandable/Expandable';

export default {
  component: Sidebar,
  title: 'Sidebar',
};

export const sidebar = () => (
  <div style={{ backgroundColor: 'grey', height: '100vh' }}>
    <Sidebar actions={[<Button onClick={action('logout')}>Logout</Button>]}>
      <Expandable label="Home page">
        <div>one</div>
        <div>two</div>
      </Expandable>
      <Expandable label="Harbors" />
    </Sidebar>
  </div>
);

sidebar.story = {
  name: 'Default',
};

export const withoutActions = () => (
  <div style={{ backgroundColor: 'grey', height: '100vh' }}>
    <Sidebar>
      <Expandable label="Home page">
        <div>one</div>
        <div>two</div>
      </Expandable>
      <Expandable label="Harbors" />
    </Sidebar>
  </div>
);
