import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';

import i18n from '../../locales/i18n';
import authService from '../auth/authService';

const typeDefs = gql`
  type CurrentUser {
    name: String
    email: String
  }
  extend type Query {
    currentUser: CurrentUser
  }
`;

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  typeDefs,
  resolvers: {
    Query: {
      async currentUser() {
        const user = await authService.getUser();

        if (!user) return null;

        const { name, email } = user.profile;

        return { __typename: 'CurrentUser', name, email };
      },
    },
  },
  request: operation => {
    const apiTokens = authService.getTokens();

    operation.setContext({
      headers: {
        'Accept-Language': i18n.language,
        'Api-Tokens': apiTokens,
      },
    });
  },
  uri: process.env.REACT_APP_API_URI,
});

cache.writeData({ data: { currentUser: null } });

export default apolloClient;
