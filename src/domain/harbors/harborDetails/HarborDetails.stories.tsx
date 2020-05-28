import React from 'react';

import HarborDetails, { HarborDetailsProps } from './HarborDetails';

const mockData: HarborDetailsProps = {
  imageFile: 'https://venepaikka-api.test.hel.ninja/media/harbors/9a8d8313-eaa2-47d2-8f2d-2bb9893f9bc7/41359.jpg',
  maps: [],
  maxWidth: 4,
  municipality: 'Helsinki',
  servicemapId: '41359',
  streetAddress: 'Meripuistotie 1a',
  zipCode: '00210',
};

export default {
  component: HarborDetails,
  title: 'HarborDetails',
};

export const harborDetails = () => <HarborDetails {...mockData} />;

harborDetails.story = {
  name: 'Default',
};
