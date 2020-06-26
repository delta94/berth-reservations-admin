import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'formik';
import { act } from 'react-dom/test-utils';

import EditForm, { EditPricingFormProps, EDIT_FORM_TYPE } from '../EditForm';
import BerthsFields from '../fields/BerthsFields';
import WinterStorageFields from '../fields/WinterStorageFields';
import HarborServicesFields from '../fields/HarborServicesFields';
import AdditionalServicesFields from '../fields/AdditionalServicesFields';
import { BerthPrice } from '../../berthPricing/BerthPricing';
import { WinterStoragePrice } from '../../winterStoragePricing/WinterStoragePricing';
import { HarborService } from '../../harborServicePricing/HarborServicePricing';
import { AdditionalService } from '../../additionalServicePricing/AdditionalServicePricing';
import {
  PeriodType,
  AdditionalProductTaxEnum,
  ProductServiceType,
  PriceUnits,
} from '../../../../@types/__generated__/globalTypes';

const berthsData: BerthPrice = {
  id: '1',
  name: 'Product dot-com',
  privateCustomer: 116,
  company: 236,
  period: PeriodType.SEASON,
  productId: '632be637-304e-4501-8642-f24c5b3c5d5f',
};

const winterStorageData: WinterStoragePrice = {
  id: '1',
  area: 'Kaisaniemi',
  privateCustomer: 8.5,
  company: 17,
  period: PeriodType.SEASON,
  productId: '4e08ff02-4a79-497e-8275-6f33fd242462',
};

const harborServicesData: HarborService = {
  id: '1',
  service: ProductServiceType.PARKING_PERMIT,
  price: 28,
  unit: PriceUnits.AMOUNT,
  period: PeriodType.SEASON,
};

const additionalServicesData: AdditionalService = {
  id: '1',
  service: ProductServiceType.SUMMER_STORAGE_FOR_TRAILERS,
  price: 24,
  tax: AdditionalProductTaxEnum.TAX_10_00,
  period: PeriodType.SEASON,
};

describe('EditForm', () => {
  const mockProps: Pick<
    EditPricingFormProps<BerthPrice | WinterStoragePrice | HarborService | AdditionalService>,
    'closeModal' | 'onSubmit'
  > = {
    onSubmit: jest.fn(),
    closeModal: jest.fn(),
  };

  const getWrapper = (
    props: Pick<
      EditPricingFormProps<BerthPrice | WinterStoragePrice | HarborService | AdditionalService>,
      'initialValues' | 'formType'
    >
  ) => mount(<EditForm {...mockProps} {...props} />);

  // [name, component, data, formType]
  const cases: [
    string,
    () => JSX.Element,
    BerthPrice | WinterStoragePrice | HarborService | AdditionalService,
    EDIT_FORM_TYPE
  ][] = [
    ['berths', BerthsFields, berthsData, EDIT_FORM_TYPE.BERTHS],
    ['winter storage', WinterStorageFields, winterStorageData, EDIT_FORM_TYPE.WINTER_STORAGE],
    ['harbor services', HarborServicesFields, harborServicesData, EDIT_FORM_TYPE.HARBOR_SERVICES],
    ['additional services', AdditionalServicesFields, additionalServicesData, EDIT_FORM_TYPE.ADDITIONAL_SERVICES],
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe.each(cases)('with %s data and form type', (name, component, data, formType) => {
    it(`should render ${component.name}`, () => {
      const form = getWrapper({
        initialValues: data,
        formType,
      }).find(Form);

      expect(form.find(component)).toHaveLength(1);
    });

    it('should render a working cancel button', () => {
      const form = getWrapper({
        initialValues: data,
        formType,
      }).find(Form);
      const cancelButton = form.find('button#cancel');
      cancelButton.simulate('click');

      expect(mockProps.closeModal).toHaveBeenCalledTimes(1);
    });

    it('should render a working submit button', () => {
      const form = getWrapper({
        initialValues: data,
        formType,
      }).find(Form);
      const submitButton = form.find('button[type="submit"]');

      expect(submitButton).toHaveLength(1);
    });

    it('should have working onSubmit', async () => {
      const form = getWrapper({
        initialValues: data,
        formType,
      }).find(Form);

      await act(async () => {
        form.simulate('submit');
      });

      expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
