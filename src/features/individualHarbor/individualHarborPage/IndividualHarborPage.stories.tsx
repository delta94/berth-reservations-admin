import React from 'react';

import IndividualHarborPage from './IndividualHarborPage';

export default {
  component: IndividualHarborPage,
  title: 'IndividualHarborPage',
};

export const individualHarborPage = () => <IndividualHarborPage />;

individualHarborPage.story = {
  name: 'Default',
};
