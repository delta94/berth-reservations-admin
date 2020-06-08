import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import apolloClient from './apolloClient';
import CustomerListPage from '../features/customerList/CustomerListPageContainer';
import HarborListPage from '../features/harborList/HarborListPageContainer';
import HarborViewPage from '../features/harborView/HarborViewPageContainer';
import CustomerViewPage from '../features/customerView/CustomerViewPageContainer';
import OfferPage from '../features/offer/OfferPageContainer';
import LoginPage from '../features/auth/loginPage/LoginPage';
import Page from './page/Page';
import PrivateRoute from '../features/auth/privateRoute/PrivateRoute';
import ApplicationListPage from '../features/applicationList/ApplicationListPageContainer';
import ApplicationViewPage from '../features/applicationView/ApplicationViewPageContainer';
import PricingPage from '../features/pricing/PricingPageContainer';
import CallbackPage from '../features/auth/callbackPage/CallbackPage';
import ErrorPage from '../features/errorPage/ErrorPage';
import ErrorBoundary from '../common/errorBoundary/ErrorBoundary';

const App: React.FC = () => {
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
                  <PrivateRoute exact path="/harbors/:id" component={HarborViewPage} />
                  <PrivateRoute exact path="/harbors" component={HarborListPage} />
                  <PrivateRoute exact path="/customers/:id" component={CustomerViewPage} />
                  <PrivateRoute exact path="/customers" component={CustomerListPage} />
                  <PrivateRoute exact path="/applications/:id" component={ApplicationViewPage} />
                  <PrivateRoute exact path="/applications" component={ApplicationListPage} />
                  <PrivateRoute exact path="/offer/:applicationId" component={OfferPage} />
                  <PrivateRoute exact path="/pricing" component={PricingPage} />
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
