import React from 'react';
import { HashRouter } from 'react-router-dom';

import WinterStorageAreaList from './WinterStorageAreaList';
import { getWinterStorageAreasData } from './utils';
import { mockData } from './__fixtures__/mockData';

export default {
  component: WinterStorageAreaList,
  decorators: [(storyFn: Function) => <HashRouter>{storyFn()}</HashRouter>],
  title: 'WinterStorageAreaList',
};

const data = getWinterStorageAreasData(mockData);

export const winterStorageAreaList = () => <WinterStorageAreaList data={data} />;
