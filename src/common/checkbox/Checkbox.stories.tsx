import React from 'react';

import Checkbox from './Checkbox';

export default {
  title: 'Welcome',
};

export const toStorybook = () => <Checkbox checked />;

toStorybook.story = {
  name: 'to Storybook',
};
