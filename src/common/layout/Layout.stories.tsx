import React from 'react';

import Layout from './Layout';

export default {
  component: Layout,
  title: 'Layout',
};

const Header = (
  <div style={{ backgroundColor: '#D7FDF0', height: '100%' }}>Main Header</div>
);
const Sidebar = (
  <div style={{ backgroundColor: '#B2FFD6', height: '100%' }}>Sidebar</div>
);
const Footer = (
  <div style={{ backgroundColor: '#D7FDF0', height: '50px' }}>Footer</div>
);

export const defaultLayout = () => (
  <Layout Header={Header} Sidebar={Sidebar}>
    content
  </Layout>
);

export const withFooter = () => (
  <Layout Header={Header} Sidebar={Sidebar} Footer={Footer}>
    content
  </Layout>
);
