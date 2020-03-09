import React from 'react';
import { HashRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

import ApplicationDetails from './ApplicationDetails';

export default {
  component: ApplicationDetails,
  decorators: [storyFn => <HashRouter>{storyFn()}</HashRouter>],
  title: 'ApplicationDetails',
};

export const applicationDetails = () => (
  <ApplicationDetails
    id="123456"
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
      { harbor: '123', harborName: 'first choice', priority: 1 },
      { harbor: '321', harborName: 'second choice', priority: 3 },
    ]}
    accessibilityRequired={true}
  />
);

applicationDetails.story = {
  name: 'Default',
};

export const withAssignedLease = () => (
  <ApplicationDetails
    id="123456"
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
      { harbor: '123', harborName: 'first choice', priority: 1 },
      { harbor: '321', harborName: 'second choice', priority: 3 },
    ]}
    lease={{ id: '9999', harborId: '123', harborName: 'first choice' }}
    handleDeleteLease={action('lease deleted')}
    accessibilityRequired={true}
  />
);
