import React from 'react';
import { shallow } from 'enzyme';

import HarborCard from '../HarborCard';
import { mockProps } from '../__fixtures__/mockData';

describe('HarborCard', () => {
  const getWrapper = (props = {}) => shallow(<HarborCard {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('"imageUrl" prop', () => {
    it('if null, image should be placeholder', () => {
      const wrapper = getWrapper();
      expect(wrapper.find('img').prop('src')).toEqual('harborPlaceholder.svg');
    });

    it('if string, image should be defined', () => {
      const wrapper = getWrapper({
        imageUrl: '/test.png',
      });
      expect(wrapper.find('img').prop('src')).toEqual('/test.png');
    });
  });

  describe('"editHarbor" prop', () => {
    it('if not provided, should not render edit button', () => {
      const wrapper = getWrapper();
      expect(wrapper.find('button')).toHaveLength(0);
    });

    it('if provided, should render edit button', () => {
      const wrapper = getWrapper({
        editHarbor: jest.fn(),
      });
      expect(wrapper.find('button')).toHaveLength(1);
    });
  });
});
