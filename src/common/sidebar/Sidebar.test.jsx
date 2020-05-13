import React from 'react';
import { shallow } from 'enzyme';

import Sidebar from './Sidebar';

describe('Sidebar', () => {
  const getWrapper = (props) =>
    shallow(
      <Sidebar {...props}>
        <div>First page</div>
        <div>Second page</div>
      </Sidebar>
    );

  it('renders normally', () => {
    const wrapper = getWrapper({ actions: [<div>Logout</div>] });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("doesn't render actions section when actions prop is not provided", () => {
    const actionsSection = getWrapper().find('.actionsWrapper');

    expect(actionsSection).toHaveLength(0);
  });
});
