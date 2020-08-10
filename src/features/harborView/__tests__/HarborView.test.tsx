import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import HarborView, { HarborViewProps } from '../HarborView';
import { getBerths, getIndividualHarborData, getMaps, getPiers } from '../utils';
import { IndividualHarborQueryData as mockData } from '../__fixtures__/mockData';
import { IndividualHarborData } from '../types';

const berths = getBerths(mockData);
const harbor = getIndividualHarborData(mockData) as IndividualHarborData;
const maps = getMaps(mockData);
const piers = getPiers(mockData);

const mockProps: HarborViewProps = {
  berths,
  harbor,
  maps,
  piers,
  setBerthToEdit: jest.fn(),
  setCreatingBerth: jest.fn(),
  setCreatingPier: jest.fn(),
  setEditingHarbor: jest.fn(),
  setPierToEdit: jest.fn(),
};

describe('HarborView', () => {
  const getWrapper = (props?: Partial<HarborViewProps>) =>
    shallow(
      <HashRouter>
        <HarborView {...mockProps} {...props} />
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
