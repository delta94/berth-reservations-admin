import { CUSTOMERS } from './__generated__/CUSTOMERS';
import { TableData } from './CustomerListComponent';

export const getCustomersData = (data: CUSTOMERS | undefined): TableData[] => {
  return (
    data?.profiles?.edges.reduce<TableData[]>((acc, profile) => {
      if (profile?.node) {
        const profileData = {
          address: profile.node.primaryAddress?.address,
          city: profile.node.primaryAddress?.city,
          email: profile.node.primaryEmail?.email,
          group: '',
          id: profile.node.id,
          invoice: '',
          name: `${profile.node.lastName} ${profile.node.firstName}`,
          organizationType: profile.node.organization?.organizationType,
          phone: profile.node.primaryPhone?.phone ?? undefined,
          postalCode: profile.node.primaryAddress?.postalCode,
          queue: '',
          startDate: '',
        };
        return [...acc, profileData];
      }
      return acc;
    }, []) ?? []
  );
};
