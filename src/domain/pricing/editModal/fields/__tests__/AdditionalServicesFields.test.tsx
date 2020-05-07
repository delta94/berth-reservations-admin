import React from 'react';
import { mount } from 'enzyme';
import { Form, Formik } from 'formik';

import AdditionalServicesFields from '../AdditionalServicesFields';
import { AdditionalService } from '../../../PricingPage';

describe('AdditionalServicesFields', () => {
  const mockValues: AdditionalService = {
    id: '1',
    service: 'trawlerSummerStorage',
    price: 25,
    tax: 24,
    period: 'season',
  };

  const getWrapper = () =>
    mount(
      <Formik
        initialValues={mockValues}
        onSubmit={jest.fn()}
        validate={jest.fn()}
      >
        {() => (
          <Form>
            <AdditionalServicesFields />
          </Form>
        )}
      </Formik>
    ).find(AdditionalServicesFields);

  it('renders normally', () => {
    const wrapper = getWrapper();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Service field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('select[name="service"]');
      expect(input.prop('value')).toEqual('trawlerSummerStorage');
    });
  });

  describe('Price field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('input#price');
      expect(input.prop('value')).toEqual(25);
    });
  });

  describe('Tax field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('select[name="tax"]');
      expect(input.prop('value')).toEqual(24);
    });
  });

  describe('Period field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('select[name="period"]');
      expect(input.prop('value')).toEqual('season');
    });
  });
});
