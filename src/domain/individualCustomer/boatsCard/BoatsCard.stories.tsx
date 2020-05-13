import React from 'react';

import BoatsCard from './BoatsCard';
import { boat, largeBoat } from './__fixtures__/mockData';

export default {
  component: BoatsCard,
  title: 'BoatsCard',
  decorators: [(storyFn) => <div style={{ backgroundColor: 'lightgrey' }}>{storyFn()}</div>],
};

export const oneBoat = () => <BoatsCard boats={[boat]} />;

export const multipleBoats = () => <BoatsCard boats={[boat, boat]} />;

export const withLargeBoat = () => <BoatsCard boats={[boat, largeBoat]} />;
