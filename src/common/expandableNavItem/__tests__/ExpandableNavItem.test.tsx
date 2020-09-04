import React from 'react';
import { shallow } from 'enzyme';

import ExpandableNavItem, { ExpandableProps } from '../ExpandableNavItem';

describe('ExpandableNavItem', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const getWrapper = (props?: ExpandableProps) =>
    shallow(
      <ExpandableNavItem label="Click me" onClick={onClick} {...props}>
        <div>one</div>
        <div>two</div>
      </ExpandableNavItem>
    );

  it('renders normally', () => {
    expect(getWrapper().render()).toMatchSnapshot();
  });

  it('calls the supplied onClick when the item is clicked', () => {
    const item = getWrapper().find('.expandableNavItem');
    item.simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
