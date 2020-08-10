import React from 'react';

import Section from './Section';

export default {
  component: Section,
  title: 'Section',
};

export const text = () => <Section>lorem ipsum</Section>;

export const textWithTitle = () => <Section title="Asiakasryhmä">Yksityinen asiakas</Section>;
