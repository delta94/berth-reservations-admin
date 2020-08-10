import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import BerthDetails, { BerthDetailsProps } from '../BerthDetails';

const minimumProps: BerthDetailsProps = {
  leases: [],
  comment: '',
};

const testLeases: BerthDetailsProps['leases'] = [
  {
    customer: {
      id: '0',
      firstName: '',
      lastName: '',
    },
    startDate: '2018-01-01',
    endDate: '2018-12-31',
    status: 'PAID',
    isActive: false,
  },
  {
    customer: {
      id: '1',
      firstName: 'Testi',
      lastName: 'Testinen',
    },
    startDate: '2019-01-01',
    endDate: '2019-12-31',
    status: 'PAID',
    isActive: false,
  },
  {
    customer: {
      id: '1',
      firstName: 'Testi',
      lastName: 'Testinen',
    },
    startDate: '2020-01-01',
    endDate: '2020-12-01',
    status: 'PAID',
    isActive: true,
  },
];

describe('BerthDetails', () => {
  const getWrapper = (props = {}) =>
    shallow(
      <HashRouter>
        <BerthDetails {...minimumProps} {...props} />
      </HashRouter>
    );

  it('renders normally with minimum props', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with null props', () => {
    const wrapper = getWrapper({
      electricity: null,
      gate: null,
      isAccessible: null,
      lighting: null,
      wasteCollection: null,
      water: null,
    });

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with all props', () => {
    const wrapper = getWrapper({
      comment: 'Comment',
      electricity: false,
      gate: true,
      isAccessible: true,
      leases: testLeases,
      lighting: false,
      onEdit: jest.fn(),
      wasteCollection: false,
      water: true,
    });

    expect(wrapper.render()).toMatchSnapshot();
  });
});
