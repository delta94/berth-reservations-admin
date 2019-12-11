import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Page from '../page/Page';
import HarborsPage from '../harbors/HarborsPageContainer';
import IndividualHarborPage from '../individualHarbor/IndividualHarborPageContainer';
import CustomersPage from '../customers/CustomerPageContainer';
import LoginPage from '../login/LoginPage';
import PrivateRoute from '../privateRoute/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Page>
          <PrivateRoute exact path="/" component={HarborsPage} />
          <PrivateRoute path="/harbors/:id" component={IndividualHarborPage} />
          <PrivateRoute path="/harbors" component={HarborsPage} />
          <PrivateRoute path="/customers" component={CustomersPage} />
        </Page>
      </Switch>
    </Router>
  );
};

export default App;
