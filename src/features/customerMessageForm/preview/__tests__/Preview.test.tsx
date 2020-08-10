import React from 'react';
import { shallow } from 'enzyme';

import Preview, { PreviewProps } from '../Preview';
import { mockHtml } from '../../__fixtures__/mockData';

const mockProps: PreviewProps = {
  preview: mockHtml,
  handleCancel: jest.fn(),
};

describe('Preview', () => {
  const getWrapper = (props?: Partial<PreviewProps>) => shallow(<Preview {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });
});
