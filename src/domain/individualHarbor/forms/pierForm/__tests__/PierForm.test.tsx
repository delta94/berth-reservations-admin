import React from 'react';
import { shallow } from 'enzyme';

import PierForm from '../PierForm';

describe('domain/individualHarbor/PierForm', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <PierForm
        initialValues={{ harborId: 'test harbor' }}
        onSubmitText="Luo"
        suitableBoatTypeOptions={[
          { id: '1', name: 'Jollavene' },
          { id: '2', name: 'Soutuvene' },
        ]}
      />
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
