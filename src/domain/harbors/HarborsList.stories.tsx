import React from 'react';
import { HashRouter } from 'react-router-dom';

import HarborsList from './HarborsList';
import { getHarborsData } from './utils';
import dummyHarbors from './__mocks__/mockdata.json';

export default {
  component: HarborsList,
  decorators: [storyFn => <HashRouter>{storyFn()}</HashRouter>],
  title: 'HarborsList',
};

const data = getHarborsData(dummyHarbors.data);

export const harborsList = () => <HarborsList data={data}>foo</HarborsList>;
