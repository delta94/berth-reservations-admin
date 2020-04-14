import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import apolloClient from './apolloClient';
import CustomersPage from '../customers/CustomerPageContainer';
import HarborsPage from '../harbors/HarborsPageContainer';
import IndividualHarborPage from '../individualHarbor/IndividualHarborPageContainer';
import IndividualCustomerPage from '../individualCustomer/IndividualCustomerPageContainer';
import OfferPage from '../offer/OfferPageContainer';
import LoginPage from '../login/LoginPage';
import Page from '../page/Page';
import PrivateRoute from '../privateRoute/PrivateRoute';
import ApplicationsPage from '../applications/ApplicationsPageContainer';
import IndividualApplicationPage from '../individualApplication/IndividualApplicationPageContainer';
import PricingPage from '../pricing/PricingPageContainer';
import CallbackPage from '../auth/callbackPage/CallbackPage';
import SilentRenewPage from '../auth/silentRenewPage/SilentRenewPage';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route exact path="/silent-callback" component={SilentRenewPage} />
          <Route exact path="/callback" component={CallbackPage} />
          <Redirect exact from="/" to="/harbors" />
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
                path="/customers/:id"
                component={IndividualCustomerPage}
              />
              <PrivateRoute exact path="/customers" component={CustomersPage} />
              <PrivateRoute
                exact
                path="/applications/:id"
                component={IndividualApplicationPage}
              />
              <PrivateRoute
                exact
                path="/applications"
                component={ApplicationsPage}
              />
              <PrivateRoute
                exact
                path="/offer/:applicationId"
                component={OfferPage}
              />
              <PrivateRoute exact path="/pricing" component={PricingPage} />
            </Switch>
          </Page>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
