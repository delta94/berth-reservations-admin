import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import apolloClient from './apolloClient';
import ApplicationList from '../features/applicationList/ApplicationListContainer';
import ApplicationView from '../features/applicationView/ApplicationViewContainer';
import CallbackPage from '../features/auth/callbackPage/CallbackPage';
import CustomerList from '../features/customerList/CustomerListContainer';
import CustomerView from '../features/customerView/CustomerViewContainer';
import ErrorBoundary from '../common/errorBoundary/ErrorBoundary';
import ErrorPage from '../features/errorPage/ErrorPage';
import HarborList from '../features/harborList/HarborListContainer';
import HarborView from '../features/harborView/HarborViewContainer';
import LoginPage from '../features/auth/loginPage/LoginPage';
import Offer from '../features/offer/OfferContainer';
import Page from './page/Page';
import Pricing from '../features/pricing/PricingContainer';
import PrivateRoute from '../features/auth/privateRoute/PrivateRoute';
import WinterStorageAreaList from '../features/winterStorageAreaList/WinterStorageAreaListContainer';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          <Route exact path="/error" component={ErrorPage} />
          <ErrorBoundary errorComponent={<Redirect to="/error" />}>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route exact path="/callback" component={CallbackPage} />
              <Redirect exact from="/" to="/harbors" />
              <Page>
                <Switch>
                  <PrivateRoute exact path="/harbors/:id" component={HarborView} />
                  <PrivateRoute exact path="/harbors" component={HarborList} />
                  <PrivateRoute exact path="/customers/:id" component={CustomerView} />
                  <PrivateRoute exact path="/customers" component={CustomerList} />
                  <PrivateRoute exact path="/applications/:id" component={ApplicationView} />
                  <PrivateRoute exact path="/applications" component={ApplicationList} />
                  <PrivateRoute exact path="/offer/:applicationId" component={Offer} />
                  <PrivateRoute exact path="/pricing" component={Pricing} />
                  <PrivateRoute exact path="/winterStorageAreas" component={WinterStorageAreaList} />
                </Switch>
              </Page>
            </Switch>
          </ErrorBoundary>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
