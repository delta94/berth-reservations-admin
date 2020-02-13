import React from 'react';

import Harborsandberths from './HarborProperties';

export default {
  title: 'Harborsandberths',
  parameters: {
    abstract: {
      // Copy a collection or layer share url from Abstract
      url: 'https://share.goabstract.com/a2582988-2439-4af7-a843-19aca98fd25c',
    },
  },
};

const dummyProps = {
  imageUrl:
    'https://avatars2.githubusercontent.com/u/3033037?s=400&u=60d3a6afcc371c55b684a9410a71820f3aeb204c&v=4',
  name: 'foo',
  address: 'foo',
  servicemapId: '666',
  properties: {
    electricity: true,
    gate: true,
    maximumWidth: 3,
    numberOfPlaces: 3,
    water: true,
    wasteCollection: true,
    lighting: true,
  },
};

// Name your stories after layers in the collection
export const blogIndex = () => <Harborsandberths {...dummyProps} />;
