import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from './Button';
import Icon from '../icon/Icon';

export default {
  component: Button,
  title: 'Button',
};

export const button = () => <Button>Button</Button>;

button.story = {
  name: 'Default',
};

export const primary = () => (
  <div>
    <Button color="brand" size="small" onClick={action('clicked')}>
      Button
    </Button>
    <br />
    <Button color="brand" size="standard" onClick={action('clicked')}>
      Button
    </Button>
    <br />
    <Button color="brand" size="large" onClick={action('clicked')}>
      Button
    </Button>
  </div>
);

export const critical = () => <Button color="critical">Button</Button>;

export const secondary = () => (
  <>
    <Button color="secondary">Button</Button>
    <Button color="secondary" variant="outlined">
      Button
    </Button>
  </>
);

export const outlined = () => (
  <Button color="secondary" variant="outlined">
    Button
  </Button>
);

export const text = () => (
  <Button color="secondary" variant="text">
    Button
  </Button>
);

export const withIcon = () => (
  <Button icon={<Icon name="tools" />}>Button</Button>
);
