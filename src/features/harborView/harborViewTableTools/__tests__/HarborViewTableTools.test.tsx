import React from 'react';
import { shallow } from 'enzyme';

import HarborViewTableTools from '../HarborViewTableTools';

describe('HarborViewTableTools', () => {
  const getWrapper = () =>
    shallow(
      <HarborViewTableTools
        onAddPier={jest.fn()}
        onAddBerth={jest.fn()}
        handleGlobalFilter={jest.fn()}
        canAddBerth={true}
      />
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
