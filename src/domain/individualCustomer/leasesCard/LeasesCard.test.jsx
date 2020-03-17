import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from 'hds-react';
import { HashRouter } from 'react-router-dom';

import LeasesCard from './LeasesCard';

describe('BerthsCard', () => {
  const initialProps = {
    handleShowContract: jest.fn(),
    leases: [
      {
        id: '1234',
        berth: 'Pursilahdenranta B 31',
        harborId: '9999',
        valid: '14.6.2019 - 10.9.2019',
      },
      {
        id: '4321',
        berth: 'Telakkakatu 1 A 10',
        harborId: '1234',
        valid: '20.5.2019 - 15.6.202',
      },
    ],
  };

  const getWrapper = props =>
    shallow(
      <HashRouter>
        <LeasesCard {...initialProps} {...props} />
      </HashRouter>
    );

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls handleShowContract when "Näytä sopimus" button is clicked', () => {
    const wrapper = mount(
      <HashRouter>
        <LeasesCard {...initialProps} />
      </HashRouter>
    );
    const firstLeaseId = initialProps.leases[0].id;
    const button = wrapper.find(Button).first();

    button.simulate('click');

    expect(initialProps.handleShowContract).toHaveBeenNthCalledWith(
      1,
      firstLeaseId
    );
  });
});
