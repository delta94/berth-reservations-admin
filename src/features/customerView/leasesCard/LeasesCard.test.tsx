import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from 'hds-react';
import { HashRouter } from 'react-router-dom';

import LeasesCard, { LeasesCardProps } from './LeasesCard';

describe('LeasesCard', () => {
  const initialProps: LeasesCardProps = {
    handleShowContract: jest.fn(),
    title: 'title',
    infoSectionTitle: 'infoSectionTitle',
    addressLabel: 'addressLabel',
    leaseDetails: [
      {
        id: '1234',
        address: 'Pursilahdenranta',
        startDate: '2019-06-14',
        endDate: '2019-09-10',
        link: 'link',
      },
      {
        id: '4321',
        address: 'Telakkakatu 1',
        startDate: '2019-05-20',
        endDate: '2020-06-15',
        link: 'link',
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
    const firstLeaseId = initialProps.leaseDetails[0].id;
    const button = wrapper.find(Button).first();

    button.simulate('click');

    expect(initialProps.handleShowContract).toHaveBeenNthCalledWith(1, firstLeaseId);
  });
});
