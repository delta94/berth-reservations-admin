import React from 'react';

import IndividualCustomerPage from './IndividualCustomerPage';
import Card from '../../../common/card/Card';

export default {
  component: IndividualCustomerPage,
  title: 'individualCustomerPage',
};

export const individualCustomerPage = () => (
  <IndividualCustomerPage>
    <Card title="Foo">Foo content</Card>
    <Card title="Bar">Bar content</Card>
  </IndividualCustomerPage>
);

individualCustomerPage.story = {
  name: 'Default',
};
