import { CUSTOMERS } from './__generated__/CUSTOMERS';
import { TableData } from './CustomerListComponent';

export const getCustomersData = (data: CUSTOMERS | undefined): TableData[] => {
  return (
    data?.profiles?.edges.reduce<TableData[]>((acc, profile) => {
      if (profile?.node) {
        const profileData = {
          id: profile.node.id,
          queue: '',
          startDate: '',
          thing: '',
          goToDetails: '',
          group: '',
          invoice: '',
          name: `${profile.node.lastName} ${profile.node.firstName}`,
        };
        return [...acc, profileData];
      }
      return acc;
    }, []) ?? []
  );
};
