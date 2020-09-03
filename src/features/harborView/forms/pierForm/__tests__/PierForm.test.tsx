import React from 'react';
import { mount } from 'enzyme';

import PierForm from '../PierForm';

describe('features/harborView/PierForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <PierForm
        initialValues={{}}
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
