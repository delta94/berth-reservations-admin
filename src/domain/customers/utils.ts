import { CUSTOMERS } from './__generated__/CUSTOMERS';

export interface CustomerData {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string | null;
  email: string | false | null;
  phone: string | false | null;
}

export const getCustomersData = (data: CUSTOMERS | undefined | any) => {
  if (data?.profiles?.edges) {
    return data.profiles.edges.map(profile => {
      if (profile?.node) {
        const profileData: CustomerData = {
          email: profile.node.emails[0]?.email,
          firstName: profile.node.firstName,
          id: profile.node.id,
          lastName: profile.node.lastName,
          nickname: profile.node.nickname,
          phone: profile.node.phones[0]?.phone,
        };
        return profileData;
      }
      return [];
    });
  }
  return [];
};
