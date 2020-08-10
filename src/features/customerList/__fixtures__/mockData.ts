import { CUSTOMERS } from '../__generated__/CUSTOMERS';
import { ContactMethod, CustomerGroup } from '../../../@types/__generated__/globalTypes';

export const dummyCustomers: CUSTOMERS = {
  profiles: {
    __typename: 'ProfileNodeConnection',
    count: 2,
    edges: [
      {
        __typename: 'ProfileNodeEdge',
        node: {
          __typename: 'ProfileNode',
          id: 'UHJvZmlsZVR5cGU6YzgwMWM4MGUtOGZiYS00N2I4LWE1YjUtYWE4ZGY5YmVlOTEy',
          firstName: 'Jussi',
          lastName: 'Virtanen',
          nickname: 'virtajussi',
          organization: null,
          primaryAddress: {
            __typename: 'AddressNode',
            address: 'Virtasentie 1',
            city: 'Helsinki',
            postalCode: '00100',
          },
          primaryPhone: null,
          primaryEmail: {
            __typename: 'EmailNode',
            email: 'test@example.com',
          },
          serviceConnections: null,
          contactMethod: ContactMethod.EMAIL,
          image: '',
          comment: '',
          boats: {
            __typename: 'BoatNodeConnection',
            edges: [],
          },
          berthApplications: {
            __typename: 'BerthApplicationNodeConnection',
            edges: [],
          },
          berthLeases: {
            __typename: 'BerthLeaseNodeConnection',
            edges: [],
          },
          customerGroup: CustomerGroup.PRIVATE,
        },
      },
      {
        __typename: 'ProfileNodeEdge',
        node: {
          __typename: 'ProfileNode',
          id: 'UHJvZmlsZVR5cGU6YzgwMWM4MGUtOGZiYS00N2I4LWE1YjUtYWE4ZGY5YmVlOTE',
          firstName: 'Jussi2',
          lastName: 'Virtanen',
          nickname: 'virtajussi',
          organization: {
            __typename: 'OrganizationNode',
            businessId: '1234567-8',
            name: 'Virtanen Oy',
            address: 'Virtasentie 1',
            city: 'Helsinki',
            postalCode: '00100',
          },
          primaryAddress: {
            __typename: 'AddressNode',
            address: 'Virtasentie 1',
            city: 'Helsinki',
            postalCode: '00100',
          },
          primaryPhone: null,
          primaryEmail: {
            __typename: 'EmailNode',
            email: 'test@example.com',
          },
          serviceConnections: null,
          contactMethod: ContactMethod.EMAIL,
          image: '',
          comment: '',
          boats: {
            __typename: 'BoatNodeConnection',
            edges: [],
          },
          berthApplications: {
            __typename: 'BerthApplicationNodeConnection',
            edges: [],
          },
          berthLeases: {
            __typename: 'BerthLeaseNodeConnection',
            edges: [],
          },
          customerGroup: CustomerGroup.PRIVATE,
        },
      },
    ],
  },
};
