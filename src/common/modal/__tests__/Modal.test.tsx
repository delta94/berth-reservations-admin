import React from 'react';
import { mount } from 'enzyme';
import ReactModal from 'react-modal';

import Modal, { ModalProps } from '../Modal';

describe('Modal', () => {
  ReactModal.setAppElement('body');
  const getWrapper = (props?: Partial<ModalProps>) =>
    mount(
      <Modal isOpen={true} {...props}>
        <p>Content</p>
      </Modal>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with all props', () => {
    const wrapper = getWrapper({
      label: 'Label',
      toggleModal: jest.fn(),
      className: 'test',
      shouldCloseOnOverlayClick: true,
    });

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should call toggleModal when closed', () => {
    const toggleModal = jest.fn();
    const wrapper = getWrapper({
      toggleModal: toggleModal,
      shouldCloseOnOverlayClick: true,
    });

    wrapper.find('.overlay').simulate('click');

    expect(toggleModal).toHaveBeenCalled();
  });
});
