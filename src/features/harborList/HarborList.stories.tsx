import React from 'react';
import { HashRouter } from 'react-router-dom';

import HarborList from './HarborList';
import { getHarborsData } from './utils';
import { mockData } from './__fixtures__/mockData';

export default {
  component: HarborList,
  decorators: [(storyFn: Function) => <HashRouter>{storyFn()}</HashRouter>],
  title: 'HarborList',
};

const data = getHarborsData(mockData);

export const harborList = () => <HarborList data={data} />;
