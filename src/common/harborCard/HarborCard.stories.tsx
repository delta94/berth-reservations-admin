import React from 'react';

import HarborCard from './HarborCard';
import { mockProps } from './__fixtures__/mockData';

export default {
  component: HarborCard,
  title: 'HarborCard',
};

export const harborCard = () => (
  <div>
    <HarborCard {...mockProps} />
  </div>
);
