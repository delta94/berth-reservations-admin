import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Form, Formik } from 'formik';

import BerthsPricingFields from './BerthsPricingFields';

const mockProps = {
  initialValues: {
    id: '1',
    width: 2,
    privateCustomer: 116,
    company: 236,
    period: 'season',
  },
};

describe('BerthsPricingFields', () => {
  const getWrapper = (props: { initialValues: any }): ShallowWrapper<any> =>
    shallow(
      <Formik
        initialValues={props.initialValues}
        onSubmit={jest.fn()}
        validate={jest.fn()}
      >
        {() => (
          <Form>
            <BerthsPricingFields />
          </Form>
        )}
      </Formik>
    );

  it('renders normally', () => {
    const wrapper = getWrapper(mockProps);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
