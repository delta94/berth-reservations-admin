import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import PrivateCustomerDetails, { PrivateCustomerDetailsProps } from '../PrivateCustomerDetails';
import { privateCustomerProfile as mockData } from '../__fixtures__/mockData';

const mockProps: PrivateCustomerDetailsProps = {
  firstName: mockData.firstName,
  lastName: mockData.lastName,
  language: mockData.language,
};

describe('PrivateCustomerDetails', () => {
  const getWrapper = (props = {}) =>
    shallow(
      <HashRouter>
        <PrivateCustomerDetails {...mockProps} {...props} />
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
