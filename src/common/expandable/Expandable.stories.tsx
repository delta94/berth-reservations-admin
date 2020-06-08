import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from 'hds-react';

import Expandable from './Expandable';

export default {
  component: Expandable,
  title: 'Expandable',
};

export const expandable = () => (
  <div style={{ width: '150px' }}>
    <Expandable label="Expandable" onClick={action('click')}>
      <Button>child</Button>
    </Expandable>
  </div>
);

expandable.story = {
  name: 'Default',
};
