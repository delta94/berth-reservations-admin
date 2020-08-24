import {
  FILTERED_CUSTOMERS,
  FILTERED_CUSTOMERS_profiles_edges as PROFILE_EDGE,
  FILTERED_CUSTOMERS_profiles_edges_node as PROFILE_NODE,
} from './__generated__/FILTERED_CUSTOMERS';
import { CustomerGroup } from '../../@types/__generated__/globalTypes';

export interface CustomerData {
  id: string;
  name: string;
  city?: string;
  address?: string;
  berths?: string | null;
  winterStoragePlaces?: string | null;
  customerGroup: CustomerGroup | null;
}

export const getFilteredCustomersData = (data?: FILTERED_CUSTOMERS): CustomerData[] => {
  if (!data?.profiles) return [];

  return data.profiles.edges.reduce<CustomerData[]>((acc, edge) => {
    const {
      id,
      firstName,
      lastName,
      primaryAddress,
      berthLeases,
      winterStorageLeases,
      customerGroup,
    } = (edge as PROFILE_EDGE).node as PROFILE_NODE;

    const berths = berthLeases?.edges
      .map((edge) => edge?.node?.berth?.pier.properties?.harbor.properties?.name)
      .join(', ');

    const winterStoragePlaces = winterStorageLeases?.edges.map((edge) => edge?.node?.area?.properties?.name).join(', ');

    return [
      ...acc,
      {
        id,
        name: `${lastName}, ${firstName}`,
        city: primaryAddress?.city,
        address: primaryAddress?.address,
        berths,
        winterStoragePlaces,
        customerGroup,
      },
    ];
  }, []);
};
