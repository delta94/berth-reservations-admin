import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import ApplicationDetails from './ApplicationDetails';

const mockProps = {
  id: '54321',
  applicationType: 'Vaihtohakemus',
  createdAt: '23.8.2019, klo 21.06',
  queue: 245,
  status: 'Ei käsitelty',
  boatType: 'Purjevene / moottoripursi',
  boatRegistrationNumber: 'A 12345',
  boatWidth: 3.2,
  boatLength: 6,
  boatDraught: 0.8,
  boatWeight: 350,
  boatName: 'Cama la Yano',
  boatModel: 'Marine',
  harborChoices: [
    { harbor: '123', priority: 1 },
    { harbor: '321', priority: 3 },
  ],
  accessibilityRequired: true,
};

describe('ApplicationDetails', () => {
  const getWrapper = (props = mockProps) =>
    shallow(
      <HashRouter>
        <ApplicationDetails {...props} />
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
