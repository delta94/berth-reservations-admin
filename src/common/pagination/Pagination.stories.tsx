import React from 'react';
import { action } from '@storybook/addon-actions';

import Pagination from './Pagination';

export default {
  component: Pagination,
  title: 'Pagination',
};

export const pagination = () => <Pagination pageCount={10} onPageChange={action('page changed')} forcePage={3} />;

pagination.story = {
  name: 'Default',
};
