import React from 'react';
import { action } from '@storybook/addon-actions';

import Expandible from './Expandible';
import Button from '../button/Button';

export default {
  component: Expandible,
  title: 'Expandible',
};

export const expandible = () => (
  <div style={{ width: '150px' }}>
    <Expandible label="Expandible" onClick={action('click')}>
      <Button variant="text">child</Button>
    </Expandible>
  </div>
);

expandible.story = {
  name: 'Default',
};
