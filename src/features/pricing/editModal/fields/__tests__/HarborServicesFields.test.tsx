import React from 'react';
import { mount } from 'enzyme';
import { Form, Formik } from 'formik';

import HarborServicesFields from '../HarborServicesFields';
import { HarborService } from '../../../harborServicePricing/HarborServicePricing';
import { ProductServiceType, PeriodType } from '../../../../../@types/__generated__/globalTypes';

const mockValues: HarborService = {
  id: '1',
  service: ProductServiceType.MOORING,
  price: 28,
  unit: '%',
  period: PeriodType.SEASON,
};

describe('HarborServicesFields', () => {
  const getWrapper = () =>
    mount(
      <Formik initialValues={mockValues} onSubmit={jest.fn()} validate={jest.fn()}>
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
      const input = getWrapper().find('Select').at(0);
      expect(input.prop('id')).toEqual('service');
      expect(input.prop('value')).toEqual('MOORING');
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
      const input = getWrapper().find('Select').at(1);
      expect(input.prop('id')).toEqual('unit');
      expect(input.prop('value')).toEqual('%');
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
