import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import apolloClient from './apolloClient';
import CustomersPage from '../features/customers/CustomerPageContainer';
import HarborsPage from '../features/harbors/HarborsPageContainer';
import IndividualHarborPage from '../features/individualHarbor/IndividualHarborPageContainer';
import IndividualCustomerPage from '../features/individualCustomer/IndividualCustomerPageContainer';
import OfferPage from '../features/offer/OfferPageContainer';
import LoginPage from '../features/auth/loginPage/LoginPage';
import Page from './page/Page';
import PrivateRoute from '../features/auth/privateRoute/PrivateRoute';
import ApplicationsPage from '../features/applications/ApplicationsPageContainer';
import IndividualApplicationPage from '../features/individualApplication/IndividualApplicationPageContainer';
import PricingPage from '../features/pricing/PricingPageContainer';
import CallbackPage from '../features/auth/callbackPage/CallbackPage';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route exact path="/callback" component={CallbackPage} />
          <Redirect exact from="/" to="/harbors" />
          <Page>
            <Switch>
              <PrivateRoute exact path="/harbors/:id" component={IndividualHarborPage} />
              <PrivateRoute exact path="/harbors" component={HarborsPage} />
              <PrivateRoute exact path="/customers/:id" component={IndividualCustomerPage} />
              <PrivateRoute exact path="/customers" component={CustomersPage} />
              <PrivateRoute exact path="/applications/:id" component={IndividualApplicationPage} />
              <PrivateRoute exact path="/applications" component={ApplicationsPage} />
              <PrivateRoute exact path="/offer/:applicationId" component={OfferPage} />
              <PrivateRoute exact path="/pricing" component={PricingPage} />
            </Switch>
          </Page>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
