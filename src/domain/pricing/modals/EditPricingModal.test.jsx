import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'formik';

import EditPricingModal, { EDIT_PRICING_FORM_TYPES } from './EditPricingModal';

const berthsData = {
  id: '1',
  width: 2,
  privateCustomer: 116,
  company: 236,
  period: 'season',
};

const winterStorageData = {
  id: '1',
  area: 'Kaisaniemi',
  privateCustomer: 8.5,
  company: 17,
  period: 'season',
};

const harborServicesData = {
  id: '1',
  service: 'mooring',
  price: 28,
  period: 'season',
};

const additionalServicesData = {
  id: '1',
  service: 'trawlerSummerStorage',
  price: 24,
  tax: 24,
  period: 'season',
};

const mockProps = {
  onSubmit: jest.fn(),
  closeModal: jest.fn(),
  isOpen: true,
};

describe('EditPricingModal', () => {
  const getWrapper = (props = {}) =>
    mount(
      <div>
        <EditPricingModal {...mockProps} {...props} />
      </div>
    );

  it('renders normally with berths data', () => {
    const wrapper = getWrapper({
      initialValues: berthsData,
      formType: EDIT_PRICING_FORM_TYPES.BERTHS,
    });
    expect(wrapper.find(Form).html()).toMatchSnapshot();
  });

  it('renders normally with winter storage data', () => {
    const wrapper = getWrapper({
      initialValues: winterStorageData,
      formType: EDIT_PRICING_FORM_TYPES.WINTER_STORAGE,
    });
    expect(wrapper.find(Form).html()).toMatchSnapshot();
  });

  it('renders normally with harbor services data', () => {
    const wrapper = getWrapper({
      initialValues: harborServicesData,
      formType: EDIT_PRICING_FORM_TYPES.HARBOR_SERVICES,
    });
    expect(wrapper.find(Form).html()).toMatchSnapshot();
  });

  it('renders normally with additional services data', () => {
    const wrapper = getWrapper({
      initialValues: additionalServicesData,
      formType: EDIT_PRICING_FORM_TYPES.ADDITIONAL_SERVICES,
    });
    expect(wrapper.find(Form).html()).toMatchSnapshot();
  });
});
