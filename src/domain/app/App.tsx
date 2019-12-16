import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { OidcProvider } from 'redux-oidc';
import axios, { AxiosResponse } from 'axios';

import OidcCallback from '../auth/OidcCallback';
import userManager from '../auth/userManager';
import CustomersPage from '../customers/CustomerPageContainer';
import HarborsPage from '../harbors/HarborsPageContainer';
import IndividualHarborPage from '../individualHarbor/IndividualHarborPageContainer';
import LoginPage from '../login/LoginPage';
import Page from '../page/Page';
import { store } from './state/AppStore';
import { BackendTokenResponse } from '../auth/types/BackendAuthenticationTypes';

const {
  REACT_APP_TUNNISTAMO_URI,
  REACT_APP_TUNNISTAMO_API_TOKEN_ENDPOINT,
} = process.env;

const client = new ApolloClient({
  request: async operation => {
    try {
      console.log('store.getState(): ', store.getState());
      const accessToken = store.getState().authentication.tunnistamo.user
        .access_token;

      const res: AxiosResponse<BackendTokenResponse> = await axios.post(
        `${REACT_APP_TUNNISTAMO_URI}/${REACT_APP_TUNNISTAMO_API_TOKEN_ENDPOINT}/`,
        {},
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }
      );

      const apiTokens = res.data;

      /*
      const tokensResponse = await fetch(
        `${REACT_APP_TUNNISTAMO_URI}/${REACT_APP_TUNNISTAMO_API_TOKEN_ENDPOINT}/`,
        {
          method: 'POST',
          headers: {
            'Authentication': `Bearer ${accessToken}`,
          },
          credentials: "cross-origin"
        }
      );
      */

      console.log('tokensResponse: ', res);

      operation.setContext({
        headers: {
          'Api-Tokens': JSON.stringify(apiTokens),
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

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <Route
                path="/login"
                component={() => <LoginPage isAuthenticated={true} />}
              />
              <Route
                exact
                path="/silent_renew"
                render={() => {
                  userManager.signinSilentCallback();
                  return null;
                }}
              />
              <Route path="/callback" component={OidcCallback} />
              <Page>
                <Route path="/harbors/:id" component={IndividualHarborPage} />
                <Route path="/harbors" component={HarborsPage} />
                <Route path="/customers" component={CustomersPage} />
              </Page>
            </Switch>
          </Router>
        </ApolloProvider>
      </OidcProvider>
    </Provider>
  );
};

export default App;
