import React from 'react';

import Chip from './Chip';

export default {
  component: Chip,
  title: 'Chip',
};

export const chip = () => (
  <>
    <Chip label="Red" color="red" />
    <Chip label="Orange" color="orange" />
    <Chip label="Yellow" color="yellow" />
    <Chip label="Green" color="green" />
    <Chip label="Grey" color="grey" />
  </>
);

chip.story = {
  name: 'Default',
};
