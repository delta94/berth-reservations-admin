import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import OrganizationCustomerDetails, { OrganizationCustomerDetailsProps } from '../OrganizationCustomerDetails';
import { organizationCustomerProfile as mockData } from '../__fixtures__/mockData';

const mockProps: OrganizationCustomerDetailsProps = {
  firstName: mockData.firstName,
  lastName: mockData.lastName,
  organization: mockData.organization,
};

describe('OrganizationCustomerDetails', () => {
  const getWrapper = (props = {}) =>
    shallow(
      <HashRouter>
        <OrganizationCustomerDetails {...mockProps} {...props} />
      </HashRouter>
    );

  it('renders normally with minimum props', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with all props', () => {
    const wrapper = getWrapper({
      ...mockData,
      title: 'Test',
      showCustomerNameAsLink: true,
    });

    expect(wrapper.render()).toMatchSnapshot();
  });
});
