import React from 'react';
import { action } from '@storybook/addon-actions';

import { mockBills } from '../__fixtures__/mockData';
import BillingHistoryCard from './BillingHistoryCard';

export default {
  component: BillingHistoryCard,
};

export const billingHistoryCard = () => <BillingHistoryCard bills={mockBills} onClick={action("Here's your bill!")} />;

billingHistoryCard.story = {
  name: 'Default',
};
