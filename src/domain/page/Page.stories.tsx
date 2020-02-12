import React from 'react';
import { HashRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../../domain/app/state/AppReducers';
import Page from './Page';

const store = createStore(rootReducer);

export default {
  component: Page,
  decorators: [
    storyFn => <HashRouter>{storyFn()}</HashRouter>,
    storyFn => <Provider store={store}>{storyFn()}</Provider>,
  ],
  title: 'Page',
};

const content = (
  <div style={{ backgroundColor: 'lightgrey', height: '100%' }}>content</div>
);

export const page = () => <Page>{content}</Page>;

page.story = {
  name: 'Default',
};
