import React from 'react';
import { shallow } from 'enzyme';

import Dropdown, { DropdownProps } from '../Dropdown';

describe('Dropdown', () => {
  const getWrapper = (props: DropdownProps = { label: 'Click here' }) =>
    shallow(
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
    const labelWrapper = wrapper.find('button.label');

    labelWrapper.simulate('click');

    expect(wrapper.find('ul').length).toBeDefined();
  });
});
