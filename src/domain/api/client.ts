import ApolloClient from 'apollo-boost';

import { store } from '../app/state/AppStore';
import { apiTokenSelector } from '../auth/state/AuthenticationSelectors';

export default new ApolloClient({
  request: async operation => {
    try {
      const token = apiTokenSelector(store.getState());
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      // User not authenticated
      // eslint-disable-next-line no-console
      console.error(e);
      // TODO: add error-handler
    }
  },
  uri: process.env.REACT_APP_API_URI,
});
