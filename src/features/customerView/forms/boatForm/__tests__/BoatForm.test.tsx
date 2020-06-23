import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import BoatForm from '../BoatForm';
import { mockBoatTypes, mockInvalidValues, mockValidValues } from '../__fixtures__/mockData';

describe('BoatForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(<BoatForm boatTypes={mockBoatTypes} initialValues={mockValidValues} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('invalid values cannot be submitted', async () => {
    const onSubmitMock = jest.fn();
    const wrapper = mount(
      <BoatForm boatTypes={mockBoatTypes} initialValues={mockInvalidValues} onSubmit={onSubmitMock} />
    );
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    expect(onSubmitMock.mock.calls.length).toEqual(0);
  });

  it('valid values can be submitted', async () => {
    const onSubmitMock = jest.fn();
    const wrapper = mount(
      <BoatForm boatTypes={mockBoatTypes} initialValues={mockValidValues} onSubmit={onSubmitMock} />
    );
    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    expect(onSubmitMock.mock.calls.length).toEqual(1);
  });
});
