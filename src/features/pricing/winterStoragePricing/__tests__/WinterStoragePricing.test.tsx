import React from 'react';
import { shallow } from 'enzyme';

import WinterStoragePricing, { WinterStoragePricingProps } from '../WinterStoragePricing';
import { data } from '../__fixtures__/data';

describe('WinterStoragePricing', () => {
  const initialProps: WinterStoragePricingProps = { data, loading: false };

  const getWrapper = (props: Partial<WinterStoragePricingProps> = {}) =>
    shallow(<WinterStoragePricing {...initialProps} {...props} />);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders noData message when there is no data', () => {
    const wrapper = getWrapper({ data: undefined });

    expect(wrapper.render()).toMatchSnapshot();
  });
});
