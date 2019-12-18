import React from 'react';

import Dropdown from './Dropdown';

export default {
  component: Dropdown,
  title: 'Dropdown',
};

export const dropdown = () => (
  <Dropdown label="test">
    <div>one</div>
    <div>two</div>
  </Dropdown>
);

dropdown.story = {
  name: 'Default',
};
