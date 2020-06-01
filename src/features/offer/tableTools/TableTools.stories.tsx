import React from 'react';
import { action } from '@storybook/addon-actions';

import TableTools from './TableTools';

export default {
  component: TableTools,
  title: 'TableTools',
};

export const tableTools = () => (
  <TableTools
    applicationType={'Exchange'}
    applicationDate={'01.01.2020'}
    applicationStatus="PENDING"
    disableSubmit={false}
    handleSubmit={action('submit')}
    handleReturn={action('return')}
  />
);

tableTools.story = {
  name: 'Default',
};
