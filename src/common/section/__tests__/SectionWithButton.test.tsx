import React from 'react';
import { shallow } from 'enzyme';

import SectionWithButton from '../SectionWithButton';

describe('SectionWithButton', () => {
  it('renders normally', () => {
    const wrapper = shallow(
      <SectionWithButton onClick={jest.fn} buttonText="button" title="title">
        Content
      </SectionWithButton>
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('calls onClick', () => {
    const onClickMock = jest.fn();
    const wrapper = shallow(
      <SectionWithButton onClick={onClickMock} buttonText="button" title="title">
        Content
      </SectionWithButton>
    );
    wrapper.find('button[type="button"]').simulate('click');
    expect(onClickMock.mock.calls.length).toEqual(1);
  });
});
