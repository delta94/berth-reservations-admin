import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import ActionHistoryCard from '../ActionHistoryCard';

describe('ActionHistoryCard', () => {
  const getWrapper = () =>
    shallow(
      <HashRouter>
        <ActionHistoryCard />
      </HashRouter>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
