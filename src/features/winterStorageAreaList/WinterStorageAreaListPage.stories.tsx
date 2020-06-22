import React from 'react';
import { HashRouter } from 'react-router-dom';

import WinterStorageAreaListPage from './WinterStorageAreaListPage';
import { getWinterStorageAreasData } from './utils';
import { mockData } from './__fixtures__/mockData';

export default {
  component: WinterStorageAreaListPage,
  decorators: [(storyFn: Function) => <HashRouter>{storyFn()}</HashRouter>],
  title: 'WinterStorageAreaListPage',
};

const data = getWinterStorageAreasData(mockData);

export const winterStorageAreaListPage = () => <WinterStorageAreaListPage data={data} />;
