import React from 'react';

import Layout from './Layout';

export default {
  component: Layout,
  title: 'Layout',
};

const header = <div style={{ backgroundColor: '#D7FDF0', height: '100%' }}>Main header</div>;
const sidebar = <div style={{ backgroundColor: '#B2FFD6', height: '100%' }}>Sidebar</div>;
const footer = <div style={{ backgroundColor: '#D7FDF0', height: '50px' }}>Footer</div>;

export const defaultLayout = () => (
  <Layout header={header} sidebar={sidebar}>
    content
  </Layout>
);

export const withFooter = () => (
  <Layout header={header} sidebar={sidebar} footer={footer}>
    content
  </Layout>
);
