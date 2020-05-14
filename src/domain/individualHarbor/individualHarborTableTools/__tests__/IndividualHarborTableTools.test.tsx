import React from 'react';
import { shallow } from 'enzyme';

import IndividualHarborTableTools from '../IndividualHarborTableTools';

describe('IndividualHarborTableTools', () => {
  const getWrapper = () =>
    shallow(
      <IndividualHarborTableTools
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
