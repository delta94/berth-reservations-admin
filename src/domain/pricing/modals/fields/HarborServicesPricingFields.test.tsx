import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Form, Formik } from 'formik';

import HarborServicesPricingFields from './HarborServicesPricingFields';

const mockProps = {
  initialValues: {
    id: '1',
    service: 'mooring',
    price: 28,
    period: 'season',
  },
};

describe('HarborServicesPricingFields', () => {
  const getWrapper = (props: { initialValues: any }): ShallowWrapper<any> =>
    shallow(
      <Formik
        initialValues={props.initialValues}
        onSubmit={jest.fn()}
        validate={jest.fn()}
      >
        {() => (
          <Form>
            <HarborServicesPricingFields />
          </Form>
        )}
      </Formik>
    );

  it('renders normally', () => {
    const wrapper = getWrapper(mockProps);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
