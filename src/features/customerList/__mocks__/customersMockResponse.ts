import { CUSTOMERS } from '../__generated__/CUSTOMERS';
import { ContactMethod, ServiceType } from '../../../@types/__generated__/globalTypes';

export const customersResponse: CUSTOMERS = {
  profiles: {
    count: 1,
    edges: [
      {
        node: {
          id: 'UHJvZmlsZU5vZGU6N2QyMGZlNmMtYWMzZC00ZTY0LWJkYzAtYTJiZjg5ODU5ZGU3',
          firstName: 'Tellervo',
          lastName: 'Toivonen',
          nickname: '',
          comment: 'Asiakas ku asiakas.',
          organization: null,
          primaryAddress: {
            address: 'Jämsänkatu 372',
            city: 'Eurajoki',
            postalCode: '62761',
            __typename: 'AddressNode',
          },
          primaryPhone: { phone: '+358 494817677', __typename: 'PhoneNode' },
          primaryEmail: { email: 'tellervo@foobar.com', __typename: 'EmailNode' },
          serviceConnections: {
            edges: [
              {
                node: {
                  id: 'U2VydmljZUNvbm5lY3Rpb25UeXBlOjIw',
                  service: { id: 'U2VydmljZU5vZGU6Mg==', type: ServiceType.BERTH, __typename: 'ServiceNode' },
                  __typename: 'ServiceConnectionType',
                },
                __typename: 'ServiceConnectionTypeEdge',
              },
            ],
            __typename: 'ServiceConnectionTypeConnection',
          },
          contactMethod: ContactMethod.SMS,
          image: '',
          boats: {
            edges: [
              {
                node: {
                  id: 'Qm9hdE5vZGU6MmM3MzZkZTItNTY1OS00NmVhLWFkM2YtOWMxMzY0MzA3ZDdk',
                  name: 'BigBoiShip',
                  __typename: 'BoatNode',
                },
                __typename: 'BoatNodeEdge',
              },
            ],
            __typename: 'BoatNodeConnection',
          },
          berthApplications: {
            edges: [
              {
                node: {
                  id: 'QmVydGhBcHBsaWNhdGlvbk5vZGU6MjY3',
                  createdAt: '2020-05-27T08:56:05.630976+00:00',
                  __typename: 'BerthApplicationNode',
                },
                __typename: 'BerthApplicationNodeEdge',
              },
            ],
            __typename: 'BerthApplicationNodeConnection',
          },
          berthLeases: {
            edges: [
              {
                node: {
                  id: 'QmVydGhMZWFzZU5vZGU6YThhNGNkOGEtMDcxYy00ZGU3LThkMGYtYTE5NmIyMDVmMWZi',
                  berth: {
                    number: 37,
                    pier: {
                      properties: {
                        identifier: 'A',
                        harbor: {
                          properties: { name: 'Puotilan venesatama', __typename: 'HarborProperties' },
                          __typename: 'HarborNode',
                        },
                        __typename: 'PierProperties',
                      },
                      __typename: 'PierNode',
                    },
                    __typename: 'BerthNode',
                  },
                  __typename: 'BerthLeaseNode',
                },
                __typename: 'BerthLeaseNodeEdge',
              },
              {
                node: {
                  id: 'QmVydGhMZWFzZU5vZGU6MWE1ZTRkOGItNDQ2Yy00NTA1LThiMDgtNDc4NTkxYTFmZTQ3',
                  berth: {
                    number: 6,
                    pier: {
                      properties: {
                        identifier: '63',
                        harbor: {
                          properties: { name: 'Kipparlahden venesatama', __typename: 'HarborProperties' },
                          __typename: 'HarborNode',
                        },
                        __typename: 'PierProperties',
                      },
                      __typename: 'PierNode',
                    },
                    __typename: 'BerthNode',
                  },
                  __typename: 'BerthLeaseNode',
                },
                __typename: 'BerthLeaseNodeEdge',
              },
            ],
            __typename: 'BerthLeaseNodeConnection',
          },
          __typename: 'ProfileNode',
        },
        __typename: 'ProfileNodeEdge',
      },
    ],
    __typename: 'ProfileNodeConnection',
  },
};
