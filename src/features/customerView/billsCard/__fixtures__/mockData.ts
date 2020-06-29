import { ProductServiceType } from '../../../../@types/__generated__/globalTypes';

export const mockBills = [
  {
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
    basePriceTaxPercentage: 24.0,
    totalPrice: 191.7,
    totalPriceTaxPercentage: 19.36,
    orderLines: [
      {
        product: ProductServiceType.ELECTRICITY,
        price: 20.5,
        taxPercentage: 24.0,
      },
      {
        product: ProductServiceType.WATER,
        price: 19.33,
        taxPercentage: 24.0,
      },
      {
        product: ProductServiceType.GATE,
        price: 2.42,
        taxPercentage: 24.0,
      },
      {
        product: ProductServiceType.MOORING,
        price: 8.33,
        taxPercentage: 24.0,
      },
      {
        product: ProductServiceType.WASTE_COLLECTION,
        price: 4.17,
        taxPercentage: 24.0,
      },
      {
        product: ProductServiceType.LIGHTING,
        price: 40.28,
        taxPercentage: 24.0,
      },
    ],
  },
];
