import React from 'react';
import { action } from '@storybook/addon-actions';
import { HashRouter } from 'react-router-dom';

import Sidebar from './Sidebar';
import Button from '../button/Button';
import ExpandableNavItem from '../expandableNavItem/ExpandableNavItem';
import InternalNavLink from '../internalNavLink/InternalNavLink';
import IconBoat from '../icons/berthReservations/IconBoat';

export default {
  component: Sidebar,
  title: 'Sidebar',
};

export const sidebar = () => (
  <HashRouter>
    <div style={{ backgroundColor: 'grey', height: '100vh', width: '300px' }}>
      <Sidebar actions={[<Button onClick={action('logout')}>Logout</Button>]}>
        <ExpandableNavItem label="Home page">
          <InternalNavLink to={'/xyz'} icon={<IconBoat />}>
            one
          </InternalNavLink>
          <InternalNavLink to={'/xyz'} icon={<IconBoat />}>
            two
          </InternalNavLink>
        </ExpandableNavItem>
        <InternalNavLink to={'/xyz'} icon={<IconBoat />}>
          three
        </InternalNavLink>
      </Sidebar>
    </div>
  </HashRouter>
);

sidebar.story = {
  name: 'Default',
};

export const withoutActions = () => (
  <HashRouter>
    <div style={{ backgroundColor: 'grey', height: '100vh', width: '300px' }}>
      <Sidebar>
        <ExpandableNavItem label="Home page">
          <InternalNavLink to={'/xyz'} icon={<IconBoat />}>
            one
          </InternalNavLink>
          <InternalNavLink to={'/xyz'} icon={<IconBoat />}>
            two
          </InternalNavLink>
        </ExpandableNavItem>
        <InternalNavLink to={'/xyz'} icon={<IconBoat />}>
          three
        </InternalNavLink>
      </Sidebar>
    </div>
  </HashRouter>
);
