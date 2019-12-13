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

import OidcCallback from '../auth/OidcCallback';
import userManager from '../auth/userManager';
import CustomersPage from '../customers/CustomerPageContainer';
import HarborsPage from '../harbors/HarborsPageContainer';
import IndividualHarborPage from '../individualHarbor/IndividualHarborPageContainer';
import LoginPage from '../login/LoginPage';
import Page from '../page/Page';
import PrivateRoute from '../privateRoute/PrivateRoute';
import { store } from './state/AppStore';

const { REACT_APP_API_URI } = process.env;
const api = REACT_APP_API_URI || '';

const client = new ApolloClient({
  uri: api,
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
