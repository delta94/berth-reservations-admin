import React from 'react';
import { HashRouter } from 'react-router-dom';

import BerthDetails from './BerthDetails';

export default {
  component: BerthDetails,
  decorators: [(storyFn) => <HashRouter>{storyFn()}</HashRouter>],
  title: 'BerthDetails',
};

export const berthDetails = () => (
  <BerthDetails
    leases={[
      {
        customer: {
          id: '123',
          firstName: 'Jack',
          lastName: 'Jones',
        },
        startDate: 'Mon Oct 07 2019 20:38:26 GMT+0300 (Eastern European Summer Time)',
        endDate: 'Thu Mar 12 2020 15:43:12 GMT+0200 (Eastern European Standard Time)',
      },
      {
        customer: {
          id: '456',
          firstName: 'Marc',
          lastName: 'Jacobs',
        },
        startDate: 'Sun Jul 14 2019 23:44:24 GMT+0300 (Eastern European Summer Time)',
        endDate: 'Tue Dec 17 2019 12:01:44 GMT+0200 (Eastern European Standard Time)',
      },
    ]}
    comment="Neque ipsum neque natus illo. Iste sed architecto consectetur repellat tempore tempora et et. Voluptatum maiores ea nisi modi numquam dolores. Animi earum ipsa ipsa dolor sit non."
    gate
    electricity
    water={false}
    lighting
    wasteCollection
    isAccessible={false}
  />
);

berthDetails.story = {
  name: 'Default',
};
