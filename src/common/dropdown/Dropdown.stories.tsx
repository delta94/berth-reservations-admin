import React from 'react';

import Dropdown from './Dropdown';
import Button from '../button/Button';

export default {
  component: Dropdown,
  title: 'Dropdown',
};

export const dropdown = () => (
  <Dropdown label={<Button>Test</Button>}>
    <div>one</div>
    <div>two</div>
  </Dropdown>
);

dropdown.story = {
  name: 'Default',
};
