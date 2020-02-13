import React from 'react';
import { HashRouter } from 'react-router-dom';

import ApplicationDetails from './ApplicationDetails';

export default {
  component: ApplicationDetails,
  decorators: [storyFn => <HashRouter>{storyFn()}</HashRouter>],
  title: 'ApplicationDetails',
};

export const applicationDetails = () => (
  <ApplicationDetails
    applicationType="Vaihtohakemus"
    createdAt="23.8.2019, klo 21.06"
    queue={245}
    status="Ei käsitelty"
    boatType="Purjevene / moottoripursi"
    boatRegistrationNumber="A 12345"
    boatWidth={3.2}
    boatLength={6}
    boatDraught={0.8}
    boatWeight={350}
    boatName="Cama la Yano"
    boatModel="Marine"
    harborChoices={[
      { harbor: '123', priority: 1 },
      { harbor: '321', priority: 3 },
    ]}
    accessibilityRequired={true}
  />
);

applicationDetails.story = {
  name: 'Default',
};
