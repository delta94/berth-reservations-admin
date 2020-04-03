import React from 'react';

import ApplicationsCard from './ApplicationsCard';

export default {
  component: ApplicationsCard,
  title: 'ApplicationsCard',
};

export const applicationsCard = () => (
  <ApplicationsCard
    applicationType="Vaihtohakemus"
    receivedDate="23.8.2019, klo 21.06"
    queueNumber={245}
    status="Ei käsitelty"
    boatType="Purjevene / moottoripursi"
    registrationNumber="A 12345"
    boatWidth="3,2 m"
    boatLength="6 m"
    boatDepth="0,8 m"
    boatWeight="350 kg"
    boatName="Cama la Yano"
    boatBrand="Marine"
    selectedPorts={[
      { title: 'Pursilahdenranta', id: '123' },
      { title: 'Pursilahdenranta', id: '123' },
    ]}
    accessible={true}
  />
);

applicationCards.story = {
  name: 'Default',
};
