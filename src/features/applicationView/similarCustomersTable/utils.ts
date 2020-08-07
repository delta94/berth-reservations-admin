import {
  FILTERED_CUSTOMERS,
  FILTERED_CUSTOMERS_profiles_edges as PROFILE_EDGE,
  FILTERED_CUSTOMERS_profiles_edges_node as PROFILE_NODE,
} from './__generated__/FILTERED_CUSTOMERS';
import { CustomerData } from '../ApplicationView';

export const getFilteredCustomersData = (data?: FILTERED_CUSTOMERS): CustomerData[] => {
  if (!data?.profiles) return [];

  return data.profiles.edges.reduce<CustomerData[]>((acc, edge) => {
    const { id, firstName, lastName, primaryAddress, berthLeases, customerGroup } = (edge as PROFILE_EDGE)
      .node as PROFILE_NODE;

    const berths = berthLeases?.edges
      .map((edge) => edge?.node?.berth?.pier.properties?.harbor.properties?.name)
      .join(', ');

    return [
      ...acc,
      {
        id,
        name: `${lastName}, ${firstName}`,
        city: primaryAddress?.city,
        address: primaryAddress?.address,
        berths,
        customerGroup,
      },
    ];
  }, []);
};
