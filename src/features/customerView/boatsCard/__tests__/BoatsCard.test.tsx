import React from 'react';
import { shallow } from 'enzyme';

import BoatsCard from '../BoatsCard';
import { boat, largeBoat } from '../__fixtures__/mockData';

const mockProps = {
  boats: [boat, largeBoat],
  onEdit: jest.fn(),
  onCreate: jest.fn(),
};

describe('BoatsCard', () => {
  const getWrapper = (props = mockProps) => shallow(<BoatsCard {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
