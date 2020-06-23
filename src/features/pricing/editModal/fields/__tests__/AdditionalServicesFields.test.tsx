import React from 'react';
import { mount } from 'enzyme';
import { Form, Formik } from 'formik';

import AdditionalServicesFields from '../AdditionalServicesFields';
import { AdditionalService } from '../../../additionalServicePricing/AdditionalServicePricing';
import {
  ProductServiceType,
  PeriodType,
  AdditionalProductTaxEnum,
} from '../../../../../@types/__generated__/globalTypes';

describe('AdditionalServicesFields', () => {
  const mockValues: AdditionalService = {
    id: '1',
    service: ProductServiceType.LIGHTING,
    price: '25',
    tax: AdditionalProductTaxEnum.TAX_24_00,
    period: PeriodType.SEASON,
  };

  const getWrapper = () =>
    mount(
      <Formik initialValues={mockValues} onSubmit={jest.fn()} validate={jest.fn()}>
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
      const input = getWrapper().find('Select').at(0);
      expect(input.prop('id')).toEqual('service');
      expect(input.prop('value')).toEqual('LIGHTING');
    });
  });

  describe('Price field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('input#price');
      expect(input.prop('value')).toEqual('25');
    });
  });

  describe('Tax field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('Select').at(1);
      expect(input.prop('id')).toEqual('tax');
      expect(input.prop('value')).toEqual('TAX_24_00');
    });
  });

  describe('Period field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('Select').at(2);
      expect(input.prop('id')).toEqual('period');
      expect(input.prop('value')).toEqual('SEASON');
    });
  });
});
