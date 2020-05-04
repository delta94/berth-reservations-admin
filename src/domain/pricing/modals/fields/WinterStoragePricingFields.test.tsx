import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Form, Formik } from 'formik';

import WinterStoragePricingFields from './WinterStoragePricingFields';

const mockProps = {
  initialValues: {
    id: '1',
    area: 'Kaisaniemi',
    privateCustomer: 8.5,
    company: 17,
    period: 'season',
  },
};

describe('WinterStoragePricingFields', () => {
  const getWrapper = (props: { initialValues: any }): ShallowWrapper<any> =>
    shallow(
      <Formik
        initialValues={props.initialValues}
        onSubmit={jest.fn()}
        validate={jest.fn()}
      >
        {() => (
          <Form>
            <WinterStoragePricingFields />
          </Form>
        )}
      </Formik>
    );

  it('renders normally', () => {
    const wrapper = getWrapper(mockProps);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
