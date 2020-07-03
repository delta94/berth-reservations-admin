import React from 'react';
import { shallow } from 'enzyme';

import Grid, { GridProps } from '../Grid';

describe('Grid', () => {
  const getWrapper = (props?: Omit<GridProps, 'children'>) =>
    shallow(
      <Grid {...props}>
        <div>one</div>
        <div>two</div>
        <div>three</div>
      </Grid>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('assigns the right className to the wrapper when the colsCount prop is provided', () => {
    const wrapper = getWrapper({ colsCount: 5 });

    expect(wrapper.hasClass('cols5')).toBe(true);
  });
});
