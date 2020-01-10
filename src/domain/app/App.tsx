import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { OidcProvider } from 'redux-oidc';
import { Provider } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import OidcCallback from '../auth/OidcCallback';
import userManager from '../auth/userManager';
import CustomersPage from '../customers/CustomerPageContainer';
import HarborsPage from '../harbors/HarborsPageContainer';
import IndividualHarborPage from '../individualHarbor/IndividualHarborPageContainer';
import LoginPage from '../login/LoginPage';
import Page from '../page/Page';
import PrivateRoute from '../privateRoute/PrivateRoute';
import { store } from './state/AppStore';
import { BackendTokenResponse } from '../auth/types/BackendAuthenticationTypes';
import i18n from '../../locales/i18n';

const {
  REACT_APP_TUNNISTAMO_URI,
  REACT_APP_TUNNISTAMO_API_TOKEN_ENDPOINT,
} = process.env;

const client = new ApolloClient({
  request: async operation => {
    try {
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

      operation.setContext({
        headers: {
          'Accept-Language': i18n.language,
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
            <Route path="/login" component={LoginPage} />
            <Route
              exact
              path="/silent_renew"
              render={() => {
                userManager.signinSilentCallback();
                return null;
              }}
            />
            <Route exact path="/callback" component={OidcCallback} />
            <Page>
              <Switch>
                <PrivateRoute
                  exact
                  path="/harbors/:id"
                  component={IndividualHarborPage}
                />
                <PrivateRoute exact path="/harbors" component={HarborsPage} />
                <PrivateRoute
                  exact
                  path="/customers"
                  component={CustomersPage}
                />
              </Switch>
            </Page>
            <Route
              exact
              path="/"
              render={() => <Redirect exact from="/" to="/harbors" />}
            />
          </Router>
        </ApolloProvider>
      </OidcProvider>
    </Provider>
  );
};

export default App;
