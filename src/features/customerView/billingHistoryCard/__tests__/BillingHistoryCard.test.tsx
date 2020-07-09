import React from 'react';
import { shallow } from 'enzyme';

import BillingHistoryCard from '../BillingHistoryCard';
import { mockBills } from '../../__fixtures__/mockData';

describe('BillingHistoryCard', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<BillingHistoryCard bills={mockBills} onClick={jest.fn} />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
