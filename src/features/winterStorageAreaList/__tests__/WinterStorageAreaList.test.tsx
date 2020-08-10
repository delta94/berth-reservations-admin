import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import WinterStorageAreaList from '../WinterStorageAreaList';
import { getWinterStorageAreasData } from '../utils';
import { mockData } from '../__fixtures__/mockData';

const mockProps = {
  data: getWinterStorageAreasData(mockData),
};

describe('WinterStorageAreaList', () => {
  const getWrapper = (props = {}) =>
    shallow(
      <MemoryRouter>
        <WinterStorageAreaList {...mockProps} {...props} />
      </MemoryRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
