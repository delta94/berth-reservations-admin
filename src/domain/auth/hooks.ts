import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_USER = gql`
  query GetUserName {
    currentUser @client {
      name
      email
    }
  }
`;

interface UserProfile {
  name: string;
  email: string;
}

type UseCurrentUser = () => UserProfile | null;

export const useCurrentUser: UseCurrentUser = () => {
  const { data } = useQuery(GET_USER);

  if (!data?.currentUser) return null;

  return data.currentUser;
};
