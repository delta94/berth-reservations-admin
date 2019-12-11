import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { OidcProvider } from 'redux-oidc';

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
const api = REACT_APP_API_URI || 'meh';

const client = new ApolloClient({
  uri: api,
});

const App: React.FC = () => {
  return (
    <OidcProvider store={store} userManager={userManager}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
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
              <PrivateRoute exact path="/" component={HarborsPage} />
              <PrivateRoute
                path="/harbors/:id"
                component={IndividualHarborPage}
              />
              <PrivateRoute path="/harbors" component={HarborsPage} />
              <PrivateRoute path="/customers" component={CustomersPage} />
            </Page>
          </Switch>
        </Router>
      </ApolloProvider>
    </OidcProvider >
  );
};

export default App;
