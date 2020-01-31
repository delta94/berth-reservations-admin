import React from 'react';
import { action } from '@storybook/addon-actions';

import BerthsCard from './BerthsCard';

export default {
  component: BerthsCard,
  title: 'BerthsCard',
  decorators: [
    storyFn => (
      <div style={{ backgroundColor: 'lightgrey', height: '100vh' }}>
        {storyFn()}
      </div>
    ),
  ],
};

export const berthsCard = () => (
  <BerthsCard
    berths={[
      {
        id: '1234',
        address: 'Pursilahdenranta B 31',
        valid: '14.6.2019 - 10.9.2019',
        handleShowContract: action("Here's your contract"),
      },
    ]}
  />
);

berthsCard.story = {
  name: 'Default',
};

export const multipleBerths = () => (
  <BerthsCard
    berths={[
      {
        id: '1234',
        address: 'Pursilahdenranta B 31',
        valid: '14.6.2019 - 10.9.2019',
        handleShowContract: action("Here's your contract"),
      },
      {
        id: '4321',
        address: 'Telakkakatu 1 A 10',
        valid: '20.5.2019 - 15.6.202',
        handleShowContract: action("Here's your contract"),
      },
    ]}
  />
);
