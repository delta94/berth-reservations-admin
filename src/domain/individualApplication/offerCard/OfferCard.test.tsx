import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import OfferCard from './OfferCard';

describe('OfferCard', () => {
  const getWrapper = (
    props = {
      berth: {
        name: 'Test',
        wasteManagement: true,
        electricity: true,
        lighting: true,
        gate: true,
        water: true,
      },
    }
  ) =>
    shallow(
      <HashRouter>
        <OfferCard {...props} />
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
