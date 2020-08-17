import { OrderStatus, PriceUnits, ProductServiceType } from '../../../@types/__generated__/globalTypes';
import { BerthBill, WinterStorageBill } from '../types';
import { INDIVIDUAL_CUSTOMER_profile as CUSTOMER_PROFILE } from '../__generated__/INDIVIDUAL_CUSTOMER';

export const emptyMockProfile: CUSTOMER_PROFILE = {
  __typename: 'ProfileNode',
  berthApplications: null,
  berthLeases: null,
  winterStorageLeases: null,
  boats: null,
  comment: null,
  firstName: '',
  id: '',
  invoicingType: null,
  language: null,
  lastName: '',
  orders: null,
  organization: null,
  primaryAddress: null,
  primaryEmail: null,
  primaryPhone: null,
  customerGroup: null,
};

export const mockBills: (BerthBill | WinterStorageBill)[] = [
  {
    status: OrderStatus.WAITING,
    berthInformation: {
      number: 1,
      pierIdentifier: 'C',
      harborName: 'Aurinkolahden venesatama (Aurinkoranta)',
    },
    contractPeriod: {
      startDate: '2020-06-26',
      endDate: '2020-09-14',
    },
    dueDate: '2020-07-10',
    basePrice: 96.67,
    totalPrice: 191.7,
    orderLines: [
      {
        product: ProductServiceType.ELECTRICITY,
        price: 20.5,
        priceUnit: PriceUnits.PERCENTAGE,
        priceValue: 9,
      },
    ],
  },
];
