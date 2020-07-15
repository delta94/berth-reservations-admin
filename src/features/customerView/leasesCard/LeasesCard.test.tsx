import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from 'hds-react';
import { HashRouter } from 'react-router-dom';

import LeasesCard, { LeasesCardProps } from './LeasesCard';

describe('LeasesCard', () => {
  const initialProps: LeasesCardProps = {
    handleShowContract: jest.fn(),
    leases: [
      {
        id: '1234',
        berthNum: 31,
        pierIdentifier: 'B',
        harbor: { id: '9999', name: 'Pursilahdenranta' },
        startDate: '2019-06-14',
        endDate: '2019-09-10',
      },
      {
        id: '4321',
        berthNum: 10,
        pierIdentifier: 'A',
        harbor: { id: '1234', name: 'Telakkakatu 1' },
        startDate: '2019-05-20',
        endDate: '2020-06-15',
      },
    ],
  };

  const getWrapper = (props?: Partial<LeasesCardProps>) =>
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

    expect(wrapper.render()).toMatchSnapshot();
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

    expect(initialProps.handleShowContract).toHaveBeenNthCalledWith(1, firstLeaseId);
  });
});
