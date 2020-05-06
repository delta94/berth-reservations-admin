import React from 'react';
import { shallow } from 'enzyme';

import EditFormFields, {
  EditFormFieldsProps,
  PRICING_TYPES,
} from '../EditFormFields';
import BerthsFields from '../BerthsFields';
import HarborServicesFields from '../HarborServicesFields';
import WinterStorageFields from '../WinterStorageFields';
import AdditionalServicesFields from '../AdditionalServicesFields';

describe('EditFormFields', () => {
  const getWrapper = (props: EditFormFieldsProps) =>
    shallow(<EditFormFields {...props} />);

  it('renders BerthsFields with BERTHS formType', () => {
    const wrapper = getWrapper({
      formType: PRICING_TYPES.BERTHS,
    });
    expect(wrapper.find(BerthsFields)).toHaveLength(1);
  });

  it('renders BerthsFields with WINTER_STORAGE formType', () => {
    const wrapper = getWrapper({
      formType: PRICING_TYPES.WINTER_STORAGE,
    });
    expect(wrapper.find(WinterStorageFields)).toHaveLength(1);
  });

  it('renders HarborServicesFields with HARBOR_SERVICES formType', () => {
    const wrapper = getWrapper({
      formType: PRICING_TYPES.HARBOR_SERVICES,
    });
    expect(wrapper.find(HarborServicesFields)).toHaveLength(1);
  });

  it('renders BerthsFields with ADDITIONAL_SERVICES formType', () => {
    const wrapper = getWrapper({
      formType: PRICING_TYPES.ADDITIONAL_SERVICES,
    });
    expect(wrapper.find(AdditionalServicesFields)).toHaveLength(1);
  });
});
