import React, { FunctionComponent } from 'react';
import { mount } from 'enzyme';
import { Form } from 'formik';
import { act } from 'react-dom/test-utils';

import EditForm, { EditPricingFormProps } from '../EditForm';
import {
  AdditionalService,
  BerthPrice,
  HarborService,
  WinterStoragePrice,
} from '../../PricingPage';
import BerthsFields from '../fields/BerthsFields';
import WinterStorageFields from '../fields/WinterStorageFields';
import HarborServicesFields from '../fields/HarborServicesFields';
import AdditionalServicesFields from '../fields/AdditionalServicesFields';
import { PRICING_TYPES } from '../fields/EditFormFields';

const berthsData: BerthPrice = {
  id: '1',
  width: 2,
  privateCustomer: 116,
  company: 236,
  period: 'season',
};

const winterStorageData: WinterStoragePrice = {
  id: '1',
  area: 'Kaisaniemi',
  privateCustomer: 8.5,
  company: 17,
  period: 'season',
};

const harborServicesData: HarborService = {
  id: '1',
  service: 'mooring',
  price: 28,
  unit: '€',
  period: 'season',
};

const additionalServicesData: AdditionalService = {
  id: '1',
  service: 'trawlerSummerStorage',
  price: 24,
  tax: 24,
  period: 'season',
};

describe('EditForm', () => {
  const mockProps: Pick<EditPricingFormProps, 'closeModal' | 'onSubmit'> = {
    onSubmit: jest.fn(),
    closeModal: jest.fn(),
  };

  const getWrapper = (
    props: Pick<EditPricingFormProps, 'initialValues' | 'formType'>
  ) => mount(<EditForm {...mockProps} {...props} />);

  // [name, component, data, formType]
  const cases: [
    string,
    FunctionComponent,
    BerthPrice | WinterStoragePrice | HarborService | AdditionalService,
    PRICING_TYPES
  ][] = [
    ['berths', BerthsFields, berthsData, PRICING_TYPES.BERTHS],
    [
      'winter storage',
      WinterStorageFields,
      winterStorageData,
      PRICING_TYPES.WINTER_STORAGE,
    ],
    [
      'harbor services',
      HarborServicesFields,
      harborServicesData,
      PRICING_TYPES.HARBOR_SERVICES,
    ],
    [
      'additional services',
      AdditionalServicesFields,
      additionalServicesData,
      PRICING_TYPES.ADDITIONAL_SERVICES,
    ],
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe.each(cases)(
    'with %s data and form type',
    (name, component, data, formType) => {
      it(`should render ${component.name}`, () => {
        const form = getWrapper({
          initialValues: data,
          formType: formType,
        }).find(Form);

        expect(form.find(component)).toHaveLength(1);
      });

      it('should render a working cancel button', () => {
        const form = getWrapper({
          initialValues: data,
          formType: formType,
        }).find(Form);
        const cancelButton = form.find('button').at(0);
        cancelButton.simulate('click');

        expect(mockProps.closeModal).toHaveBeenCalledTimes(1);
      });

      it('should render a working submit button', () => {
        const form = getWrapper({
          initialValues: data,
          formType: formType,
        }).find(Form);
        const submitButton = form.find('button[type="submit"]');

        expect(submitButton).toHaveLength(1);
      });

      it('should have working onSubmit', async () => {
        const form = getWrapper({
          initialValues: data,
          formType: formType,
        }).find(Form);

        await act(async () => {
          form.simulate('submit');
        });

        expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
      });
    }
  );
});
