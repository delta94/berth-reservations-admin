import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import WinterStoragePricing, { WinterStoragePricingProps } from '../WinterStoragePricing';
import { data } from '../__fixtures__/data';

describe('WinterStoragePricing', () => {
  const initialProps: WinterStoragePricingProps = { data, loading: false };

  const getWrapper = (props: Partial<WinterStoragePricingProps> = {}) =>
    mount(
      <MockedProvider>
        <WinterStoragePricing {...initialProps} {...props} />
      </MockedProvider>
    );

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
