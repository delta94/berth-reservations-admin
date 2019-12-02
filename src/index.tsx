import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import * as Sentry from '@sentry/browser';

import App from './domain/app/App';
import * as serviceWorker from './serviceWorker';
import i18n from './locales/i18n';

import './assets/styles/main.scss';

const {
  REACT_APP_API_URI,
  REACT_APP_SENTRY_DSN,
  REACT_APP_SENTRY_ENVIRONMENT,
} = process.env;

const client = new ApolloClient({
  uri: REACT_APP_API_URI,
});

Sentry.init({
  dsn: REACT_APP_SENTRY_DSN,
  environment: REACT_APP_SENTRY_ENVIRONMENT,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
