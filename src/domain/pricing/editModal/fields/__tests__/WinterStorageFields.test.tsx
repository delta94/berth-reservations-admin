import React from 'react';
import { mount } from 'enzyme';
import { Form, Formik } from 'formik';

import WinterStorageFields from '../WinterStorageFields';
import { WinterStoragePrice } from '../../../PricingPage';

describe('WinterStorageFields', () => {
  const mockValues: WinterStoragePrice = {
    id: '1',
    area: 'Kaisaniemi',
    privateCustomer: 8.5,
    company: 17,
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
            <WinterStorageFields />
          </Form>
        )}
      </Formik>
    ).find(WinterStorageFields);

  it('renders normally', () => {
    const wrapper = getWrapper();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Service field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('select[name="area"]');
      expect(input.prop('value')).toEqual('Kaisaniemi');
    });
  });

  describe('Private customer field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('input#privateCustomer');
      expect(input.prop('value')).toEqual(8.5);
    });
  });

  describe('Company (customer) field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('input#company');
      expect(input.prop('value')).toEqual(17);
    });
  });

  describe('Period field', () => {
    it('Should show provided initialValue', () => {
      const input = getWrapper().find('select[name="period"]');
      expect(input.prop('value')).toEqual('season');
    });
  });
});
