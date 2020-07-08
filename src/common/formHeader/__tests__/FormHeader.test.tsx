import React from 'react';
import { shallow } from 'enzyme';

import FormHeader from '../FormHeader';

const mockProps = {
  title: 'Test',
};

describe('FormHeader', () => {
  const getWrapper = (props = {}) => shallow(<FormHeader {...mockProps} {...props} />);

  it('renders normally with minimum props', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with all props', () => {
    const wrapper = getWrapper({
      isSubmitting: true,
      onDeleteText: 'Delete this',
      onDelete: jest.fn(),
    });

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('onDelete should be called if the button is clicked', () => {
    const onDelete = jest.fn();
    const wrapper = getWrapper({
      onDelete: onDelete,
    });

    wrapper.find('button').simulate('click');

    expect(onDelete).toHaveBeenCalled();
  });
});
