import React from 'react';
import { HashRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

import LeasesCard from './LeasesCard';

export default {
  component: LeasesCard,
  title: 'LeasesCard',
  decorators: [
    storyFn => <HashRouter>{storyFn()}</HashRouter>,
    storyFn => (
      <div
        style={{
          padding: '20px',
          backgroundColor: 'lightgrey',
          height: '100vh',
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
};

export const berthsCard = () => (
  <LeasesCard
    handleShowContract={action("Here's your contract")}
    leases={[
      {
        id: '1234',
        harbor: { id: '9999', name: 'Pursilahdenranta' },
        berthNum: '03',
        pierIdentifier: 'A',
        startDate:
          'Fri Nov 01 2019 18:40:22 GMT+0200 (Eastern European Standard Time)',
        endDate:
          'Wed Feb 12 2020 02:14:24 GMT+0200 (Eastern European Standard Time)',
      },
    ]}
  />
);

berthsCard.story = {
  name: 'Default',
};

export const multipleLeases = () => (
  <LeasesCard
    handleShowContract={action("Here's your contract")}
    leases={[
      {
        id: '1234',
        harbor: { id: '9999', name: 'Pursilahdenranta' },
        berthNum: '03',
        pierIdentifier: 'A',
        startDate:
          'Fri Nov 01 2019 18:40:22 GMT+0200 (Eastern European Standard Time)',
        endDate:
          'Wed Feb 12 2020 02:14:24 GMT+0200 (Eastern European Standard Time)',
      },
      {
        id: '8888',
        harbor: { id: '2222', name: 'Telakkakatu' },
        berthNum: '22',
        pierIdentifier: 'C',
        startDate:
          'Wed Feb 26 2020 00:37:26 GMT+0200 (Eastern European Standard Time)',
        endDate:
          'Mon Mar 16 2020 14:07:32 GMT+0200 (Eastern European Standard Time)',
      },
    ]}
  />
);
