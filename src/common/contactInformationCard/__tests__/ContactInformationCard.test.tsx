import React from 'react';
import { shallow } from 'enzyme';

import ContactInformationCard, { ContactInformationCardProps } from '../ContactInformationCard';

const mockProps: ContactInformationCardProps = {};

describe('ContactInformationCard', () => {
  const getWrapper = (props: ContactInformationCardProps) => shallow(<ContactInformationCard {...props} />);

  it('renders normally with all props', () => {
    const wrapper = getWrapper(mockProps);

    expect(wrapper.render()).toMatchSnapshot();
  });
});
