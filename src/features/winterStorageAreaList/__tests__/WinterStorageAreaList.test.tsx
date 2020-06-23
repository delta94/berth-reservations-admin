import React from 'react';
import { shallow } from 'enzyme';

import WinterStorageAreaList from '../WinterStorageAreaList';
import { getWinterStorageAreasData } from '../utils';
import { mockData } from '../__fixtures__/mockData';

const mockProps = {
  data: getWinterStorageAreasData(mockData),
};

describe('WinterStorageAreaList', () => {
  const getWrapper = (props = {}) => shallow(<WinterStorageAreaList {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
