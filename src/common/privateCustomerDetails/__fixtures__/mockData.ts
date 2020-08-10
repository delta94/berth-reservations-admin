import { InvoicingType, Language } from '../../../@types/__generated__/globalTypes';

export const privateCustomerProfile = {
  comment: 'Testikäyttäjä',
  customerId: '0',
  firstName: 'Testi',
  invoicingType: InvoicingType.PAPER_INVOICE,
  lastName: 'Käyttäjä',
  primaryAddress: {
    address: 'Testikatu 1',
    postalCode: '00100',
    city: 'Helsinki',
  },
  primaryEmail: 'test@example.com',
  primaryPhone: '0504391742',
  language: Language.FINNISH,
  ssn: '010101A1234',
};
