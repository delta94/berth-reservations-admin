import React from 'react';

import ExternalLink from './ExternalLink';

export default {
  component: ExternalLink,
  title: 'ExternalLink',
};

export const all = () => (
  <div>
    <ExternalLink
      href="https://github.com/City-of-Helsinki/berth-reservations-admin/"
      variant="default"
    >
      link
    </ExternalLink>
    <br />

    <ExternalLink
      href="https://github.com/City-of-Helsinki/berth-reservations-admin/"
      variant="withArrow"
    >
      with arrow
    </ExternalLink>
    <br />
  </div>
);
