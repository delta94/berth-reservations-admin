import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Form, Formik } from 'formik';

import AdditionalServicesPricingFields from './AdditionalServicesPricingFields';

const mockProps = {
  initialValues: {
    id: '1',
    service: 'trawlerSummerStorage',
    price: 24,
    tax: 24,
    period: 'season',
  },
};

describe('AdditionalServicesPricingFields', () => {
  const getWrapper = (props: { initialValues: any }): ShallowWrapper<any> =>
    shallow(
      <Formik
        initialValues={props.initialValues}
        onSubmit={jest.fn()}
        validate={jest.fn()}
      >
        {() => (
          <Form>
            <AdditionalServicesPricingFields />
          </Form>
        )}
      </Formik>
    );

  it('renders normally', () => {
    const wrapper = getWrapper(mockProps);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
