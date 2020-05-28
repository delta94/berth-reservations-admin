import React from 'react';
import { mount } from 'enzyme';

import BerthForm from '../BerthForm';
import { BerthMooringType } from '../../../../../@types/__generated__/globalTypes';
import { Pier } from '../../../utils/utils';

const pierOptions = [{ id: 'a', identifier: 'A' }] as Pier[];
const validValues = {
  numer: 0,
  comment: '',
  isActive: true,
  mooringType: BerthMooringType.DINGHY_PLACE,
  width: 3,
  length: 3,
  depth: 5,
  pier: pierOptions[0].identifier,
  pierId: pierOptions[0].id,
};

describe('features/harborView/BerthForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(<BerthForm initialValues={validValues} pierOptions={pierOptions} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
