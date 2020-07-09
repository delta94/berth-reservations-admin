import React from 'react';
import { mount } from 'enzyme';

import BillModal from '../BillModal';
import { mockBills } from '../../__fixtures__/mockData';

describe('BillModal', () => {
  it('renders correctly', () => {
    const wrapper = mount(<BillModal bill={mockBills[0]} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('calls toggleModal method on button close click', () => {
    const toggleModalMock = jest.fn();
    const wrapper = mount(<BillModal bill={mockBills[0]} toggleModal={toggleModalMock} />);
    wrapper.find('button').simulate('click');
    expect(toggleModalMock).toBeCalledWith(false);
  });
});
