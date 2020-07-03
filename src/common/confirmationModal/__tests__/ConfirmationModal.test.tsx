import React from 'react';
import { mount } from 'enzyme';
import ReactModal from 'react-modal';

import ConfirmationModal from '../ConfirmationModal';

describe('ConfirmationModal', () => {
  it('renders correctly', () => {
    ReactModal.setAppElement('body');
    const wrapper = mount(
      <ConfirmationModal
        isOpen={true}
        title={'title'}
        infoText={'info text'}
        warningText={'warning text'}
        onCancelText={'cancel'}
        onConfirmText={'confirm'}
        onCancel={jest.fn}
        onConfirm={jest.fn}
      />
    );

    expect(wrapper.render()).toMatchSnapshot();
  });
});
