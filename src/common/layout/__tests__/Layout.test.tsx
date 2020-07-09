import React from 'react';
import { shallow } from 'enzyme';

import Layout from '../Layout';

describe('Layout', () => {
  const header = <div>header</div>;
  const sidebar = <div>sidebar</div>;
  const footer = <footer>footer</footer>;
  const getWrapper = () =>
    shallow(
      <Layout header={header} sidebar={sidebar} footer={footer}>
        Content
      </Layout>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
