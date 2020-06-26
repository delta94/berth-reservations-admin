import React from 'react';
import { action } from '@storybook/addon-actions';

import Expandable from './Expandable';
import Button from '../button/Button';

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
