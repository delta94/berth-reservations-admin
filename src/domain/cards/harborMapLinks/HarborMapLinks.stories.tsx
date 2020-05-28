import React from 'react';

import HarborMapLinks from './HarborMapLinks';

export default {
  component: HarborMapLinks,
  title: 'HarborMapLinks',
};

export const single = () => (
  <div>
    <HarborMapLinks maps={[{ id: '0', url: 'testurl' }]} />
  </div>
);

export const multiple = () => (
  <div>
    <HarborMapLinks
      maps={[
        { id: '0', url: 'testurl' },
        { id: '1', url: 'testurl' },
        { id: '2', url: 'testurl' },
      ]}
    />
  </div>
);
