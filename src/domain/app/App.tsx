import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HarborsPage from '../harbors/HarborsPageContainer';
const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HarborsPage} />
        <Route path="/harbors" component={HarborsPage} />
      </Switch>
    </Router>
  );
};

export default App;
