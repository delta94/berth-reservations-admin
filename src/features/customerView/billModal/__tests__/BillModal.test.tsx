import React from 'react';
import { mount } from 'enzyme';
import ReactModal from 'react-modal';

import BillModal from '../BillModal';
import { mockBills } from '../../__fixtures__/mockData';

describe('BillModal', () => {
  ReactModal.setAppElement('body');

  it('renders correctly', () => {
    ReactModal.setAppElement('body');
    const wrapper = mount(<BillModal bill={mockBills[0]} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('calls toggleModal method on button close click', () => {
    ReactModal.setAppElement('body');
    const toggleModalMock = jest.fn();
    const wrapper = mount(<BillModal bill={mockBills[0]} toggleModal={toggleModalMock} />);
    wrapper.find('button').simulate('click');
    expect(toggleModalMock).toBeCalledWith(false);
  });
});
