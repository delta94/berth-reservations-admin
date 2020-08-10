import React from 'react';
import { mount } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import OfferCard from '../OfferCard';
import { BerthMooringType } from '../../../../@types/__generated__/globalTypes';

describe('OfferCard', () => {
  const getWrapper = (
    props = {
      leaseDetails: {
        id: '123456',
        berthComment: 'Testi',
        berthDepth: 3,
        berthIsAccessible: true,
        berthLength: 6,
        berthMooringType: BerthMooringType.DINGHY_PLACE,
        berthNum: '1',
        berthWidth: 4,
        electricity: true,
        gate: true,
        harborName: 'Testisatama',
        lighting: true,
        pierIdentifier: 'Testilaituri',
        wasteCollection: true,
        water: true,
        order: null,
      },
      handleDeleteLease: jest.fn(),
    }
  ) =>
    mount(
      <HashRouter>
        <OfferCard {...props} />
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
