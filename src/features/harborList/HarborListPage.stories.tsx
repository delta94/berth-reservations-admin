import React from 'react';
import { HashRouter } from 'react-router-dom';

import HarborListPage from './HarborListPage';
import { getHarborsData } from './utils';
import { mockData } from './__fixtures__/mockData';

export default {
  component: HarborListPage,
  decorators: [(storyFn: Function) => <HashRouter>{storyFn()}</HashRouter>],
  title: 'HarborListPage',
};

const data = getHarborsData(mockData);

export const harborListPage = () => <HarborListPage data={data}>foo</HarborListPage>;
