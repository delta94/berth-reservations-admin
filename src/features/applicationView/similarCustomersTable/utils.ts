import { FILTERED_CUSTOMERS } from './__generated__/FILTERED_CUSTOMERS';
import { CustomerData } from '../ApplicationView';

export const getFilteredCustomersData = (data?: FILTERED_CUSTOMERS): CustomerData[] => {
  if (!data?.profiles) return [];

  return data.profiles.edges.reduce<CustomerData[]>((acc, edge) => {
    if (!edge?.node) return acc;
    const { id, firstName, lastName, primaryAddress, berthLeases, customerGroup } = edge.node;

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
