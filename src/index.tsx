import React from 'react';
import ReactDOM from 'react-dom';

import App from './domain/app/App';
import * as serviceWorker from './serviceWorker';
import './locales/i18n';

import './assets/styles/main.scss';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
