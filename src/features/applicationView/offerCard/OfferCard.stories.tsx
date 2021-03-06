import React from 'react';
import { HashRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

import OfferCard from './OfferCard';
import { BerthMooringType } from '../../../@types/__generated__/globalTypes';

export default {
  component: OfferCard,
  title: 'OfferCard',
  decorators: [
    (storyFn) => (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f1f1f1',
          height: '100vh',
        }}
      >
        <HashRouter>{storyFn()}</HashRouter>
      </div>
    ),
  ],
};

export const offerCard = () => (
  <OfferCard
    leaseDetails={{
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
    }}
    handleDeleteLease={action('lease deleted')}
  />
);

offerCard.story = {
  name: 'Default',
};
