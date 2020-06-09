import React from 'react';
import { shallow } from 'enzyme';

import BoatCard from '../BoatCard';
import { mockBoat, mockBoatWithMissingFields } from '../__fixtures__/mockData';

describe('BoatCard', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<BoatCard boat={mockBoat} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders missing fields correctly', () => {
    const wrapper = shallow(<BoatCard boat={mockBoatWithMissingFields} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
