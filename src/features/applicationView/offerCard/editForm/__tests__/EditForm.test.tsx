import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import EditForm, { EditFormProps } from '../EditForm';
import LoadingSpinner from '../../../../../common/spinner/LoadingSpinner';
import { ORDER_OPTIONAL_PRODUCTS_QUERY } from '../queries';
import { ORDER_OPTIONAL_PRODUCTS } from '../__generated__/ORDER_OPTIONAL_PRODUCTS';
import {
  AdditionalProductType,
  PeriodType,
  PriceUnits,
  ProductServiceType,
} from '../../../../../@types/__generated__/globalTypes';

const mockProps: EditFormProps = {
  orderId: '',
  refetchQueries: [],
  selectedProducts: [],
  handleCancel: jest.fn(),
  handleSubmit: jest.fn(),
};

const mockData: ORDER_OPTIONAL_PRODUCTS = {
  additionalProducts: {
    __typename: 'AdditionalProductNodeConnection',
    edges: [
      {
        __typename: 'AdditionalProductNodeEdge',
        node: {
          __typename: 'AdditionalProductNode',
          id: 'MOCK-ADDITIONAL-PRODUCT',
          period: PeriodType.SEASON,
          priceUnit: PriceUnits.AMOUNT,
          priceValue: 350,
          productType: AdditionalProductType.OPTIONAL_SERVICE,
          service: ProductServiceType.PARKING_PERMIT,
        },
      },
    ],
  },
};

const queryMock = {
  request: {
    query: ORDER_OPTIONAL_PRODUCTS_QUERY,
  },
  result: { data: mockData },
};

describe('EditForm', () => {
  const getWrapper = (props?: Partial<EditFormProps>, queryMocks?: ReadonlyArray<MockedResponse>) =>
    mount(
      <MockedProvider mocks={queryMocks || [queryMock]}>
        <EditForm {...mockProps} {...props} />
      </MockedProvider>
    );

  const waitForContent = async (wrapper: ReactWrapper) => {
    await act(async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.contains(<LoadingSpinner isLoading={true} />)).toBeFalsy();
      });
    });
  };

  it('renders normally', async () => {
    const wrapper = getWrapper();

    await waitForContent(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders noData message when there is no data', async () => {
    const wrapper = getWrapper({}, []);

    await waitForContent(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
