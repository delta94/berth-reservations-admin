import React from 'react';

import Icon from './Icon';

export default {
  component: Icon,
  title: 'Icon',
};

export const icon = () => <Icon name="fence" />;

icon.story = {
  name: 'Default',
};

export const large = () => <Icon name="fence" size="large" />;

export const small = () => <Icon name="fence" size="small" />;

export const white = () => <Icon name="fence" color="white" />;

export const outlined = () => <Icon name="fence" outlined />;
