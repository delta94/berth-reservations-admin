import React from 'react';
import { HashRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../app/state/AppReducers';
import HarborsList from './HarborsList';
import { getHarborsData } from './utils';
import dummyHarbors from './__mocks__/mockdata.json';

const store = createStore(rootReducer);

export default {
  component: HarborsList,
  decorators: [
    storyFn => <HashRouter>{storyFn()}</HashRouter>,
    storyFn => <Provider store={store}>{storyFn()}</Provider>,
  ],
  title: 'HarborsList',
};

const data = getHarborsData(dummyHarbors.data);

export const harborsList = () => <HarborsList data={data}>foo</HarborsList>;
