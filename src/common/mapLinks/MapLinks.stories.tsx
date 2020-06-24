import React from 'react';

import MapLinks from './MapLinks';

export default {
  component: MapLinks,
  title: 'MapLinks',
};

export const single = () => (
  <div>
    <MapLinks maps={[{ id: '0', url: 'testurl' }]} />
  </div>
);

export const multiple = () => (
  <div>
    <MapLinks
      maps={[
        { id: '0', url: 'testurl' },
        { id: '1', url: 'testurl' },
        { id: '2', url: 'testurl' },
      ]}
    />
  </div>
);
