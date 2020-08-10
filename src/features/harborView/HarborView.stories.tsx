import React from 'react';
import { action } from '@storybook/addon-actions';
import { HashRouter } from 'react-router-dom';

import HarborView, { HarborViewProps } from './HarborView';
import { getBerths, getIndividualHarborData, getMaps, getPiers } from './utils';
import { IndividualHarborQueryData as mockData } from './__fixtures__/mockData';
import { IndividualHarborData } from './types';

const berths = getBerths(mockData);
const harbor = getIndividualHarborData(mockData) as IndividualHarborData;
const maps = getMaps(mockData);
const piers = getPiers(mockData);

const mockProps: HarborViewProps = {
  berths,
  harbor,
  maps,
  piers,
  setBerthToEdit: action('setBerthToEdit'),
  setCreatingBerth: action('setCreatingBerth'),
  setCreatingPier: action('setCreatingPier'),
  setEditingHarbor: action('setEditingHarbor'),
  setPierToEdit: action('setPierToEdit'),
};

export default {
  component: HarborView,
  title: 'HarborView',
};

export const harborView = () => (
  <div style={{ backgroundColor: '#f1f1f1' }}>
    <HashRouter>
      <HarborView {...mockProps} />
    </HashRouter>
  </div>
);

harborView.story = {
  name: 'Default',
};
