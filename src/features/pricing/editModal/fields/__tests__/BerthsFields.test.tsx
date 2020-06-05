import React from 'react';
import { mount } from 'enzyme';
import { Form, Formik } from 'formik';

import BerthsFields from '../BerthsFields';
import { PeriodType } from '../../../../../@types/__generated__/globalTypes';

describe('BerthsFields', () => {
  const mockValues: any = {
    id: '1',
    width: 2,
    privateCustomer: 116,
    company: 236,
    period: PeriodType.SEASON,
  };

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
    expect(wrapper.html()).toMatchSnapshot();
  });

  // TODO: Fix the test when
  describe('Width field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('select[name="width"]');
      expect(input.prop('value')).toEqual(2);
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
      expect(input.prop('value')).toEqual(236);
    });
  });

  describe('Period field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('select[name="period"]');
      expect(input.prop('value')).toEqual('SEASON');
    });
  });
});
