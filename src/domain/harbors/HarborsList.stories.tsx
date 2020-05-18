import React from 'react';
import { HashRouter } from 'react-router-dom';

import HarborsPage from './HarborsPage';
import { getHarborsData } from './utils';
import dummyHarbors from './__mocks__/mockdata.json';

export default {
  component: HarborsPage,
  decorators: [(storyFn) => <HashRouter>{storyFn()}</HashRouter>],
  title: 'HarborsList',
};

const data = getHarborsData(dummyHarbors.data);

export const harborsList = () => <HarborsPage data={data}>foo</HarborsPage>;
