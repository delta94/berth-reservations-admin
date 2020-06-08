import React from 'react';
import { shallow, mount } from 'enzyme';

import BerthPricing, { BerthPricingProps } from '../BerthPricing';
import { data } from '../__fixtures__/data';

describe('BerthPricing', () => {
  const initialProps: BerthPricingProps = { data, loading: false, openModal: jest.fn() };

  const getWrapper = (props: Partial<BerthPricingProps> = {}) => shallow(<BerthPricing {...initialProps} {...props} />);
  const getMountWrapper = (props: Partial<BerthPricingProps> = {}) =>
    mount(<BerthPricing {...initialProps} {...props} />);

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
