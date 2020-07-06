import React from 'react';

import ContactInformationCard, { ContactInformationCardProps } from './ContactInformationCard';

export default {
  component: ContactInformationCard,
  title: 'ContactInformationCard',
  decorators: [
    (storyFn: Function) => (
      <div
        style={{
          padding: '20px',
          width: '600px',
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
};

const mockProps: ContactInformationCardProps = {
  name: 'Aurinkolahden venesatama (Aurinkoranta)',
  streetAddress: 'Aurinkoranta 1',
  zipCode: '00990',
  municipality: 'Helsinki',
};

export const contactInformationCard = () => <ContactInformationCard {...mockProps} />;
