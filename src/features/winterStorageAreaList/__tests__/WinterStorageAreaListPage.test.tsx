import React from 'react';
import { shallow } from 'enzyme';

import WinterStorageAreaListPage from '../WinterStorageAreaListPage';
import { getWinterStorageAreasData } from '../utils';
import { mockData } from '../__fixtures__/mockData';

const mockProps = {
  data: getWinterStorageAreasData(mockData),
};

describe('WinterStorageAreaListPage', () => {
  const getWrapper = (props = {}) => shallow(<WinterStorageAreaListPage {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
