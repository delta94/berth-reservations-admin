import React from 'react';
import { shallow } from 'enzyme';

import ContactInformationCard, { ContactInformationCardProps } from '../ContactInformationCard';

const mockProps: ContactInformationCardProps = {
  name: 'Aurinkolahden venesatama (Aurinkoranta)',
  streetAddress: 'Aurinkoranta 1',
  zipCode: '00990',
  municipality: 'Helsinki',
};

describe('ContactInformationCard', () => {
  const getWrapper = (props: ContactInformationCardProps) => shallow(<ContactInformationCard {...props} />);

  it('renders normally with minimum props', () => {
    const wrapper = getWrapper({
      zipCode: '00100',
    });

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with all props', () => {
    const wrapper = getWrapper(mockProps);

    expect(wrapper.render()).toMatchSnapshot();
  });
});
