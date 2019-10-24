import React from 'react';
import { shallow } from 'enzyme';

import Layout from './Layout';

describe('Layout', () => {
  const Header = <div>header</div>;
  const Sidebar = <div>sidebar</div>;
  const Footer = <footer>footer</footer>;
  const getWrapper = () =>
    shallow(
      <Layout Header={Header} Sidebar={Sidebar} Footer={Footer}>
        Content
      </Layout>
    );

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
