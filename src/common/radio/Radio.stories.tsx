import React from 'react';
import { action } from '@storybook/addon-actions';

import Radio from './Radio';

export default {
  component: Radio,
  title: 'Radio',
};

export const withLabel = () => (
  <Radio onChange={action('clicked')} label="Check me" />
);

export const checked = () => (
  <>
    <Radio size="small" onChange={action('clicked')} checked />
    <Radio size="medium" onChange={action('clicked')} checked />
    <Radio size="large" onChange={action('clicked')} checked />
  </>
);

export const unChecked = () => (
  <>
    <Radio size="small" onChange={action('clicked')} />
    <Radio size="medium" onChange={action('clicked')} />
    <Radio size="large" onChange={action('clicked')} />
  </>
);

export const disabled = () => (
  <>
    <Radio onChange={action('clicked')} disabled />
    <Radio onChange={action('clicked')} checked disabled />
  </>
);

export const readOnly = () => (
  <>
    <Radio onChange={action('clicked')} readOnly />
    <Radio onChange={action('clicked')} checked readOnly />
  </>
);
