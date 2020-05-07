import React from 'react';
import { mount } from 'enzyme';
import { Form, Formik } from 'formik';

import HarborServicesFields from '../HarborServicesFields';
import { HarborService } from '../../../PricingPage';

const mockValues: HarborService = {
  id: '1',
  service: 'mooring',
  price: 28,
  unit: '%',
  period: 'season',
};

describe('HarborServicesFields', () => {
  const getWrapper = () =>
    mount(
      <Formik
        initialValues={mockValues}
        onSubmit={jest.fn()}
        validate={jest.fn()}
      >
        {() => (
          <Form>
            <HarborServicesFields />
          </Form>
        )}
      </Formik>
    ).find(HarborServicesFields);

  it('renders normally', () => {
    const wrapper = getWrapper();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Service field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('select[name="service"]');
      expect(input.prop('value')).toEqual('mooring');
    });
  });

  describe('Price field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('input#price');
      expect(input.prop('value')).toEqual(28);
    });
  });

  describe('Unit field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('select[name="unit"]');
      expect(input.prop('value')).toEqual('%');
    });
  });

  describe('Period field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('select[name="period"]');
      expect(input.prop('value')).toEqual('season');
    });
  });
});
