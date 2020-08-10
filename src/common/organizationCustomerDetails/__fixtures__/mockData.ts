import { CustomerGroup, InvoicingType, Language } from '../../../@types/__generated__/globalTypes';

export const organizationCustomerProfile = {
  comment: 'Testikäyttäjä',
  customerId: '0',
  firstName: 'Testi',
  invoicingType: InvoicingType.PAPER_INVOICE,
  lastName: 'Käyttäjä',
  organization: {
    address: 'Liiketoimintaraitti 12',
    businessId: '1234567-8',
    city: 'Helsinki',
    name: 'Liikeyritys Oy',
    postalCode: '00100',
  },
  primaryAddress: {
    address: 'Testikatu 1',
    postalCode: '00100',
    city: 'Helsinki',
  },
  primaryEmail: 'test@example.com',
  primaryPhone: '0504391742',
  language: Language.FINNISH,
  ssn: '010101A1234',
  customerGroup: CustomerGroup.COMPANY,
};
