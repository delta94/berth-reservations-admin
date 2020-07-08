import React from 'react';
import { shallow } from 'enzyme';

import PageContent from '../PageContent';

describe('PageContent', () => {
  it('renders normally', () => {
    const wrapper = shallow(
      <PageContent>
        <p>Test</p>
      </PageContent>
    );

    expect(wrapper.render()).toMatchSnapshot();
  });
});
