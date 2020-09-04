import React from 'react';
import { action } from '@storybook/addon-actions';
import { HashRouter } from 'react-router-dom';

import ExpandableNavItem from './ExpandableNavItem';
import IconBoat from '../icons/berthReservations/IconBoat';
import InternalNavLink from '../internalNavLink/InternalNavLink';

export default {
  component: ExpandableNavItem,
  title: 'Expandable',
};

export const expandableNavItem = () => (
  <HashRouter>
    <div style={{ width: '300px' }}>
      <ExpandableNavItem label="ExpandableNavItem" onClick={action('click')}>
        <InternalNavLink to={'/child'} icon={<IconBoat />}>
          child
        </InternalNavLink>
      </ExpandableNavItem>
    </div>
  </HashRouter>
);

expandableNavItem.story = {
  name: 'Default',
};
