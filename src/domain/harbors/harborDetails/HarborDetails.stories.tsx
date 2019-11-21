import React from 'react';

import HarborDetails from './HarborDetails';

export default {
  component: HarborDetails,
  title: 'HarborDetails',
};

export const harborDetails = () => <HarborDetails></HarborDetails>;

harborDetails.story = {
  name: 'Default',
};
