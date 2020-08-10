import { BerthLease_lease as BerthLease } from '../__generated__/BerthLease';
import {
  BerthMooringType,
  ProductServiceType,
  AdditionalProductType,
} from '../../../../@types/__generated__/globalTypes';

export const lease: BerthLease = {
  id: '165023f5-5b74-4656-9315-d4e1a22f111d',
  berth: {
    depth: null,
    length: 6,
    mooringType: BerthMooringType.SINGLE_SLIP_PLACE,
    width: 2.5,
    comment: '',
    isAccessible: null,
    number: 1,
    pier: {
      properties: {
        identifier: 'C',
        electricity: true,
        gate: true,
        lighting: true,
        mooring: true,
        wasteCollection: true,
        water: true,
        harbor: {
          id: 'b55da996-cf00-4b52-9aa0-6b13fd8d806b',
          properties: {
            name: 'Aurinkolahden venesatama (Aurinkoranta)',
            __typename: 'HarborProperties',
          },
          __typename: 'HarborNode',
        },
        __typename: 'PierProperties',
      },
      __typename: 'PierNode',
    },
    __typename: 'BerthNode',
  },
  order: {
    id: '07f65f54-4a25-47fd-9eea-d9fdddfa46f9',
    price: '96.67',
    totalPrice: '256.70',
    orderLines: {
      edges: [
        {
          node: {
            id: '9b97b9bc-bba5-46d9-aae2-86e8686012ef',
            price: '20.50',
            product: {
              id: 'dc7f8158-a4cb-49a9-9368-e586f224fdb5',
              service: ProductServiceType.ELECTRICITY,
              productType: AdditionalProductType.FIXED_SERVICE,
              __typename: 'AdditionalProductNode',
            },
            __typename: 'OrderLineNode',
          },
          __typename: 'OrderLineNodeEdge',
        },
        {
          node: {
            id: 'ea2ef175-f790-45a0-b16f-9e5a98340691',
            price: '19.33',
            product: {
              id: '2e55f605-061e-4299-814d-bf2cd53aa8ce',
              service: ProductServiceType.WATER,
              productType: AdditionalProductType.FIXED_SERVICE,
              __typename: 'AdditionalProductNode',
            },
            __typename: 'OrderLineNode',
          },
          __typename: 'OrderLineNodeEdge',
        },
        {
          node: {
            id: '8ba4de61-63cc-49fc-afe2-26068f3c8e4d',
            price: '2.42',
            product: {
              id: '3a2e3a2f-2782-40e9-a139-b9a4d4a36c3b',
              service: ProductServiceType.GATE,
              productType: AdditionalProductType.FIXED_SERVICE,
              __typename: 'AdditionalProductNode',
            },
            __typename: 'OrderLineNode',
          },
          __typename: 'OrderLineNodeEdge',
        },
        {
          node: {
            id: '59c768c1-f371-4178-afda-1e16d2c725b0',
            price: '8.33',
            product: {
              id: '762da6e9-89be-43bc-b097-53dff4ed8415',
              service: ProductServiceType.MOORING,
              productType: AdditionalProductType.FIXED_SERVICE,
              __typename: 'AdditionalProductNode',
            },
            __typename: 'OrderLineNode',
          },
          __typename: 'OrderLineNodeEdge',
        },
        {
          node: {
            id: '6d910d8e-80b6-4486-aa85-4958bcd98dd5',
            price: '4.17',
            product: {
              id: '34c5b6bc-7eb8-457e-bce8-8ba3a07b9057',
              service: ProductServiceType.WASTE_COLLECTION,
              productType: AdditionalProductType.FIXED_SERVICE,
              __typename: 'AdditionalProductNode',
            },
            __typename: 'OrderLineNode',
          },
          __typename: 'OrderLineNodeEdge',
        },
        {
          node: {
            id: 'ab7cf1e5-92b5-42ad-844a-e2d577d30baf',
            price: '40.28',
            product: {
              id: '650dbfcb-8f10-46b6-af64-197b77686a5b',
              service: ProductServiceType.LIGHTING,
              productType: AdditionalProductType.FIXED_SERVICE,
              __typename: 'AdditionalProductNode',
            },
            __typename: 'OrderLineNode',
          },
          __typename: 'OrderLineNodeEdge',
        },
        {
          node: {
            id: '244a7af9-6f91-4f08-9738-82ef06a2e790',
            price: '65.00',
            product: {
              id: '5194dd14-0226-4603-808c-831cfbec72de',
              service: ProductServiceType.DINGHY_PLACE,
              productType: AdditionalProductType.OPTIONAL_SERVICE,
              __typename: 'AdditionalProductNode',
            },
            __typename: 'OrderLineNode',
          },
          __typename: 'OrderLineNodeEdge',
        },
      ],
      __typename: 'OrderLineNodeConnection',
    },
    __typename: 'OrderNode',
  },
  __typename: 'BerthLeaseNode',
};
