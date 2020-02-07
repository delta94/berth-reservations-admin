import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'hds-react';

import BerthsCard from './BerthsCard';

describe('BerthsCard', () => {
  const mockProps = {
    berths: [
      {
        id: '1234',
        address: 'Pursilahdenranta B 31',
        valid: '14.6.2019 - 10.9.2019',
        handleShowContract: jest.fn(),
      },
      {
        id: '4321',
        address: 'Telakkakatu 1 A 10',
        valid: '20.5.2019 - 15.6.202',
        handleShowContract: jest.fn(),
      },
    ],
  };

  const getWrapper = (props = mockProps) => shallow(<BerthsCard {...props} />);

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls handleShowContract when "Näytä sopimus" button is clicked', () => {
    const wrapper = getWrapper();
    const button = wrapper.find(Button).first();
    button.simulate('click');

    expect(mockProps.berths[0].handleShowContract).toHaveBeenCalledTimes(1);
  });
});
