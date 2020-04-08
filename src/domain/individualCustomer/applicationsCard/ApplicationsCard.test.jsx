import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import ApplicationsCard from './ApplicationsCard';

const mockProps = {
  applications: [
    {
      id: '54321',
      berthSwitch: {
        harborId: '123',
        harborName: 'harbor',
        pierIdentifier: 'pier',
        berthNum: 'berth',
      },
      createdAt:
        'Wed Oct 23 2019 15:15:05 GMT+0300 (Eastern European Summer Time)',
      queue: 245,
      status: 'PENDING',
      lease: null,
      boatType: 'Purjevene / moottoripursi',
      boatRegistrationNumber: 'A 12345',
      boatWidth: 3.2,
      boatLength: 6,
      boatDraught: 0.8,
      boatWeight: 350,
      boatName: 'Cama la Yano',
      boatModel: 'Marine',
      harborChoices: [
        { harbor: '123', harborName: 'first choice', priority: 1 },
        { harbor: '321', harborName: 'second choice', priority: 3 },
      ],
      accessibilityRequired: true,
    },
  ],
};

describe('ApplicationsCard', () => {
  const getWrapper = (props = mockProps) =>
    shallow(
      <HashRouter>
        <ApplicationsCard {...props} />
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
