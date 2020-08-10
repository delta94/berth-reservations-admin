import React from 'react';
import { shallow } from 'enzyme';

import PierSelectHeader from '../PierSelectHeader';

describe('PierSelectHeader', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <PierSelectHeader
        piers={[]}
        selectedPier={null}
        onPierSelect={() => {
          /* noop */
        }}
      />
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
