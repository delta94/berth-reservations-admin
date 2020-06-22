import React from 'react';
import { shallow } from 'enzyme';

import WinterStorageAreaListPage from '../WinterStorageAreaListPage';

const mockProps = {
  data: [
    {
      id: '0',
      name: 'Test WS Area 0',
    },
    {
      id: '1',
      name: 'Test WS Area 1',
    },
  ],
};

describe('WinterStorageAreaListPage', () => {
  const getWrapper = (props = {}) => shallow(<WinterStorageAreaListPage {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
