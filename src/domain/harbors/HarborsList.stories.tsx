import React from 'react';
import { HashRouter } from 'react-router-dom';

import HarborsPage from './HarborsPage';
import { getHarborsData } from './utils';
import { mockData } from './__mocks__/mockData';

export default {
  component: HarborsPage,
  decorators: [(storyFn: Function) => <HashRouter>{storyFn()}</HashRouter>],
  title: 'HarborsList',
};

const data = getHarborsData(mockData);

export const harborsList = () => <HarborsPage data={data}>foo</HarborsPage>;
