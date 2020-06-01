import React from 'react';
import { action } from '@storybook/addon-actions';

import BillsCard from './BillsCard';

export default {
  component: BillsCard,
  title: 'BillsCard',
};

export const billsCard = () => (
  <BillsCard
    berthPlace="Pursilahdenranta B 31"
    contractPeriod="14.9.2019 - 10.6.2019"
    dueDate="1.4.2019"
    basicFee={284}
    mooringFee={[79.52, '28%']}
    electricityFee={[34.08, '12%']}
    waterFee={[5.68, '2%']}
    wasteFee={[22.72, '8%']}
    gateFee={4}
    lightingFee={10}
    total={440}
    handleShowBill={action("Here's your bill!")}
  />
);

billsCard.story = {
  name: 'Default',
};
