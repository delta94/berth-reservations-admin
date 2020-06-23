import React from 'react';

import CustomerView from './CustomerView';
import Card from '../../common/card/Card';

export default {
  component: CustomerView,
  title: 'CustomerView',
};

export const customerView = () => (
  <CustomerView>
    <Card title="Foo">Foo content</Card>
    <Card title="Bar">Bar content</Card>
  </CustomerView>
);

customerView.story = {
  name: 'Default',
};
