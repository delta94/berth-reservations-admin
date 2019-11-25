import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HarborsPage from '../harbors/HarborsPageContainer';
import IndividualHarborPage from '../individualHarbor/IndividualHarborPageContainer';
import Page from '../page/Page';

const App: React.FC = () => {
  return (
    <Router>
      <Page>
        <Switch>
          <Route exact path="/" component={HarborsPage} />
          <Route path="/harbors/:id" component={IndividualHarborPage} />
          <Route path="/harbors" component={HarborsPage} />
        </Switch>
      </Page>
    </Router>
  );
};

export default App;
