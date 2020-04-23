import { CUSTOMERS } from './__generated__/CUSTOMERS';
import { TableData } from './CustomerListComponent';
import { mapCustomerGroup } from '../utils';

export const getCustomersData = (data: CUSTOMERS | undefined): TableData[] => {
  return (
    data?.profiles?.edges.reduce<TableData[]>((acc, profile) => {
      if (profile?.node) {
        const profileData = {
          customerGroup: mapCustomerGroup(profile.node.organization),
          id: profile.node.id,
          queue: '',
          startDate: '',
          group: '',
          invoice: '',
          address: profile.node.primaryAddress?.address,
          city: profile.node.primaryAddress?.city,
          postalCode: profile.node.primaryAddress?.postalCode,
          phone: profile.node.primaryPhone?.phone ?? undefined,
          email: profile.node.primaryEmail?.email,
          name: `${profile.node.lastName} ${profile.node.firstName}`,
        };
        return [...acc, profileData];
      }
      return acc;
    }, []) ?? []
  );
};
