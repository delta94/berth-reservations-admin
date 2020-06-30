import React from 'react';
import { action } from '@storybook/addon-actions';

import BillsCard from './BillsCard';
import { mockBills } from '../__fixtures__/mockData';

export default {
  component: BillsCard,
};

export const billsCard = () => <BillsCard bills={mockBills} handleShowBill={action("Here's your bill!")} />;

billsCard.story = {
  name: 'Default',
};
