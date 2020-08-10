import React from 'react';

import WinterStorageAreaDetails, { WinterStorageAreaDetailsProps } from './WinterStorageAreaDetails';
import { getWinterStorageAreasData } from '../utils';
import { mockData } from '../__fixtures__/mockData';
import { WinterStorageAreaData } from '../types';

const mockArea: WinterStorageAreaData = getWinterStorageAreasData(mockData)[1];
const mockProps: WinterStorageAreaDetailsProps = {
  imageFile: mockArea.imageFile,
  maps: mockArea.maps,
  maxWidth: mockArea.maxWidth,
  municipality: mockArea.municipality,
  streetAddress: mockArea.streetAddress,
  zipCode: mockArea.zipCode,
};

export default {
  component: WinterStorageAreaDetails,
  title: 'WinterStorageAreaDetails',
};

export const winterStorageAreaDetails = () => <WinterStorageAreaDetails {...mockProps} />;

winterStorageAreaDetails.story = {
  name: 'Default',
};
