import React from 'react';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox';

export default {
  component: Checkbox,
  title: 'Checkbox',
};

export const withLabel = () => (
  <Checkbox size="small" onChange={action('clicked')} label="Check me" />
);

export const checked = () => (
  <>
    <Checkbox size="small" onChange={action('clicked')} checked />
    <Checkbox size="medium" onChange={action('clicked')} checked />
    <Checkbox size="large" onChange={action('clicked')} checked />
  </>
);

export const unChecked = () => (
  <>
    <Checkbox size="small" onChange={action('clicked')} />
    <Checkbox size="medium" onChange={action('clicked')} />
    <Checkbox size="large" onChange={action('clicked')} />
  </>
);

export const disabled = () => (
  <>
    <Checkbox onChange={action('clicked')} disabled />
    <Checkbox onChange={action('clicked')} checked disabled />
  </>
);

export const readOnly = () => (
  <>
    <Checkbox onChange={action('clicked')} readOnly />
    <Checkbox onChange={action('clicked')} checked readOnly />
  </>
);
