import React from 'react';
import { shallow } from 'enzyme';

import EditModal, { EditPricingModalProps } from '../EditModal';
import EditForm from '../EditForm';
import { PRICING_TYPES } from '../fields/EditFormFields';

describe('EditModal', () => {
  const mockProps: EditPricingModalProps = {
    closeModal: jest.fn(),
    formType: PRICING_TYPES.BERTHS,
    initialValues: {
      id: '1',
      width: 2,
      privateCustomer: 116,
      company: 236,
      period: 'season',
    },
    isOpen: true,
    onSubmit: jest.fn(),
  };

  const getWrapper = () => shallow(<EditModal {...mockProps} />);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('passes received props to EditForm', () => {
    const formWrapper = getWrapper().find(EditForm);
    expect(formWrapper.props()).toEqual({
      closeModal: mockProps.closeModal,
      formType: mockProps.formType,
      initialValues: mockProps.initialValues,
      onSubmit: mockProps.onSubmit,
    });
  });
});
