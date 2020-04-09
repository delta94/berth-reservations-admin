import React from 'react';
import { HashRouter } from 'react-router-dom';

import OfferCard from './OfferCard';

export default {
  component: OfferCard,
  title: 'OfferCard',
  decorators: [
    storyFn => (
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
    berth={{
      name: 'Test',
      wasteManagement: true,
      electricity: true,
      lighting: true,
      gate: true,
      water: true,
    }}
  />
);

offerCard.story = {
  name: 'Default',
};
