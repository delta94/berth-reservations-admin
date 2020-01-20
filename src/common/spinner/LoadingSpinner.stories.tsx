import React from 'react';

import Loader from './LoadingSpinner';

export default {
  component: Loader,
  title: 'Loader',
};

export const loader = () => <Loader isLoading={true}>Button</Loader>;
export const isNotLoading = () => <Loader isLoading={false}>Button</Loader>;

loader.story = {
  name: 'IsLoading',
};
