import React from 'react';
import { shallow } from 'enzyme';

import { WinterStorageAreaData } from '../../types';
import { getWinterStorageAreasData } from '../../utils';
import { mockData } from '../../__fixtures__/mockData';
import WinterStorageAreaDetails, { WinterStorageAreaDetailsProps } from '../WinterStorageAreaDetails';

const mockArea: WinterStorageAreaData = getWinterStorageAreasData(mockData)[1];
const mockProps: WinterStorageAreaDetailsProps = {
  imageFile: mockArea.imageFile,
  maps: mockArea.maps,
  maxWidth: mockArea.maxWidth,
  municipality: mockArea.municipality,
  streetAddress: mockArea.streetAddress,
  zipCode: mockArea.zipCode,
};

describe('WinterStorageAreaDetails', () => {
  const getWrapper = (props = {}) => shallow(<WinterStorageAreaDetails {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
