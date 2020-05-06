import React from 'react';
import { mount } from 'enzyme';

import BerthForm from '../BerthForm';
import { BerthMooringType } from '../../../../../@types/__generated__/globalTypes';

describe('domain/individualHarbor/BerthForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(<BerthForm />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  /* FIXME:
  it('calls onSubmit when valid values are entered', () => {
    const onSubmitMock = jest.fn();
    const validValues = {
      numer: 0,
      comment: '',
      isActive: true,
      mooringType: BerthMooringType.DINGHY_PLACE,
      width: 3,
      length: 3,
      depth: 5,
      pier: '-',
      pierId: 'test',
    };
    const wrapper = mount(
      <BerthForm initialValues={validValues} onSubmit={onSubmitMock} />
    );
    wrapper.find('form').simulate('submit');
    expect(onSubmitMock).toBeCalledTimes(1);
    expect(onSubmitMock.mock.calls[0][0]).toBe(validValues);
  });

  it('does not call onSubmit with invalid values', () => {
    const onSubmitMock = jest.fn();
    const wrapper = mount(
      <BerthForm initialValues={{}} onSubmit={onSubmitMock} />
    );
    wrapper.find('button[type="submit"]').simulate('click');
    expect(onSubmitMock).toBeCalledTimes(0);
  });

  it('calls onCancel on click', () => {
    const onCancelMock = jest.fn();
    const wrapper = mount(<BerthForm onCancel={onCancelMock} />);
    wrapper.find('button').simulate('click');
    expect(onCancelMock).toBeCalledTimes(1);
  });

  it('renders delete button only when prop onDelete is passed', () => {
    const wrapperWithoutDelete = mount(<BerthForm />);
    const wrapperWithDelete = mount(<BerthForm onDelete={jest.fn()} />);
    //expect(wrapperWithoutDelete.contains()).toBeFalsy();
    //expect(wrapperWithDelete.contains()).toBeTruthy();
  });

  it('calls onDelete with current values', () => {
    const initialValues = { pierId: 'test' };
    const onDeleteMock = jest.fn();
    const wrapper = mount(
      <BerthForm initialValues={initialValues} onDelete={onDeleteMock} />
    );
    wrapper.find('').simulate('click');
    expect(onDeleteMock).toBeCalledTimes(1);
    expect(onDeleteMock.mock.calls[0][0]).toBe(initialValues);
  });

  it('displays errors when trying to submit invalid values', () => {
    const wrapper = mount(<BerthForm />);
    expect(wrapper.contains('.invalid')).toBeFalsy();
    wrapper.find('button[type="submit"]').simulate('click');
    expect(wrapper.contains('.invalid')).toBeTruthy();
  });
   */
});
