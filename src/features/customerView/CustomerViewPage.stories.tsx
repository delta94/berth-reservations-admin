import React from 'react';

import CustomerViewPage from './CustomerViewPage';
import Card from '../../common/card/Card';

export default {
  component: CustomerViewPage,
  title: 'CustomerViewPage',
};

export const customerViewPage = () => (
  <CustomerViewPage>
    <Card title="Foo">Foo content</Card>
    <Card title="Bar">Bar content</Card>
  </CustomerViewPage>
);

customerViewPage.story = {
  name: 'Default',
};
