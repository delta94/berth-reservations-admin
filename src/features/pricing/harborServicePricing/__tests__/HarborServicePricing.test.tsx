import React from 'react';
import { shallow, mount } from 'enzyme';

import HarborServicePricing, { HarborServicePricingProps } from '../HarborServicePricing';
import { data } from '../__fixtures__/data';

describe('HarborServicePricing', () => {
  const initialProps: HarborServicePricingProps = { data, loading: false, openModal: jest.fn() };

  const getWrapper = (props: Partial<HarborServicePricingProps> = {}) =>
    shallow(<HarborServicePricing {...initialProps} {...props} />);
  const getMountWrapper = (props: Partial<HarborServicePricingProps> = {}) =>
    mount(<HarborServicePricing {...initialProps} {...props} />);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders noData message when there is no data', () => {
    const wrapper = getWrapper({ data: undefined });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls the provided openModal function when edit button is clicked', () => {
    const wrapper = getMountWrapper();
    const button = wrapper.find('button').first();

    button.simulate('click');

    expect(initialProps.openModal).toHaveBeenCalledTimes(1);
  });
});
