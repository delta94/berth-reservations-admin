import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Harbors from '../harbors/HarborsContainer';
import styles from './app.module.scss';

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className={styles.app}>
            <header className={styles.header}>
              <p>{t('harboursList.title')}</p>
            </header>
          </div>
        </Route>
        <Route path="/harbors" component={Harbors} />
      </Switch>
    </Router>
  );
};

export default App;
