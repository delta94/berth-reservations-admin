import React from 'react';
import { mount } from 'enzyme';

import Dropdown, { DropdownProps } from '../Dropdown';

describe('Dropdown', () => {
  const getWrapper = (props: Omit<DropdownProps, 'children'> = { label: 'Click here' }) =>
    mount(
      <Dropdown {...props}>
        <ul>
          <li>one</li>
          <li>two</li>
        </ul>
      </Dropdown>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('opens the menu when you click on the label', () => {
    const label = <button className="label">Click here</button>;
    const wrapper = getWrapper({ label });

    wrapper.find('button.label').simulate('click');

    expect(wrapper.render()).toMatchSnapshot();
  });
});
