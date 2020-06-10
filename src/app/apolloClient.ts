import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import gql from 'graphql-tag';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

import i18n from '../locales/i18n';
import authService from '../features/auth/authService';
import hdsToast from '../common/toast/hdsToast';

const typeDefs = gql`
  type CurrentUser {
    id: ID!
    name: String
    email: String
  }
  extend type Query {
    currentUser: CurrentUser
  }
`;

const cache = new InMemoryCache();
cache.writeData({ data: { currentUser: null } });

const authLink = setContext((_, { headers }) => {
  const apiTokens = authService.getTokens();
  return {
    headers: {
      ...headers,
      'Accept-Language': i18n.language,
      'Api-Tokens': apiTokens,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    hdsToast.graphQLErrors(graphQLErrors);
  }
  if (networkError && networkError.name !== 'ServerError') {
    // An explicit id is passed here to the toast,
    // so it can be automatically dismissed on e.g. reconnection.
    hdsToast({
      type: 'warning',
      labelText: 'toast.networkError.label',
      text: 'toast.networkError.description',
      toastId: 'networkErrorToast',
      translated: true,
    });
  }
});

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_URI,
  headers: {
    'keep-alive': 'true',
  },
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, uploadLink, new HttpLink({ uri: process.env.REACT_APP_API_URI })]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
  cache,
  typeDefs,
  resolvers: {
    Query: {
      async currentUser() {
        const user = await authService.getUser();

        if (!user) return null;

        const { name, email, sub } = user.profile;

        return { __typename: 'CurrentUser', id: sub, name, email };
      },
    },
  },
});

export default apolloClient;
