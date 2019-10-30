import React from 'react';

import Paragraph from './Paragraph';

export default {
  component: Paragraph,
  title: 'Paragraph',
};

export const text = () => <Paragraph>lorem ipsum</Paragraph>;

export const textWithTitle = () => (
  <Paragraph title="Asiakasryhmä">Yksityinen asiakas</Paragraph>
);
