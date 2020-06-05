import React from 'react';
import { shallow, mount } from 'enzyme';

import AdditionalServicePricing, { AdditionalServicePricingProps } from '../AdditionalServicePricing';
import { data } from '../__fixtures__/data';

describe('AdditionalServicePricing', () => {
  const initialProps: AdditionalServicePricingProps = { data, loading: false, openModal: jest.fn() };

  const getWrapper = (props: Partial<AdditionalServicePricingProps> = {}) =>
    shallow(<AdditionalServicePricing {...initialProps} {...props} />);
  const getMountWrapper = (props: Partial<AdditionalServicePricingProps> = {}) =>
    mount(<AdditionalServicePricing {...initialProps} {...props} />);

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
