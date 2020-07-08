import React from 'react';
import { shallow } from 'enzyme';

import Expandable, { ExpandableProps } from '../Expandable';

describe('Expandable', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const getWrapper = (props?: ExpandableProps) =>
    shallow(
      <Expandable label="Click me" onClick={onClick} {...props}>
        <div>one</div>
        <div>two</div>
      </Expandable>
    );

  it('renders normally', () => {
    expect(getWrapper().render()).toMatchSnapshot();
  });

  it('calls the supplied onClick when the button is clicked', () => {
    const labelContainer = getWrapper().find('Button');
    labelContainer.simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
