import React from 'react';
import { mount } from 'enzyme';
import { Form, Formik } from 'formik';

import BerthsFields from '../BerthsFields';
import { PeriodType } from '../../../../../@types/__generated__/globalTypes';
import { BerthPrice } from '../../../berthPricing/BerthPricing';

const mockValues: BerthPrice = {
  id: '1870f0d4-fa63-48a8-8e8e-5d0a9df7e88b',
  name: '2 m',
  privateCustomer: 116,
  company: 232,
  period: PeriodType.SEASON,
  productId: '9518ddd2-28d9-4b62-b5db-a9605bff9b4d',
};

describe('BerthsFields', () => {
  const getWrapper = () =>
    mount(
      <Formik initialValues={mockValues} onSubmit={jest.fn()} validate={jest.fn()}>
        {() => (
          <Form>
            <BerthsFields />
          </Form>
        )}
      </Formik>
    ).find(BerthsFields);

  it('renders normally', () => {
    const wrapper = getWrapper();
    expect(wrapper.render()).toMatchSnapshot();
  });

  describe('Width field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('input#name');
      expect(input.prop('value')).toEqual('2 m');
    });
  });

  describe('Private customer field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('input#privateCustomer');
      expect(input.prop('value')).toEqual(116);
    });
  });

  describe('Company (customer) field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('input#company');
      expect(input.prop('value')).toEqual(232);
    });
  });

  describe('Period field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('Select').at(0);
      expect(input.prop('id')).toEqual('period');
      expect(input.prop('value')).toEqual('SEASON');
    });
  });
});
