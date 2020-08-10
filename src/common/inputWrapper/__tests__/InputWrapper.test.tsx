import { shallow } from 'enzyme';
import React from 'react';

import InputWrapper, { InputWrapperProps } from '../InputWrapper';

const mockProps = {
  id: 'test',
  children: <input id={'test'} />,
};

const getWrapper = (props?: Partial<InputWrapperProps>) => {
  const wrapperProps = { ...mockProps, ...props };
  return shallow(<InputWrapper {...(wrapperProps as InputWrapperProps)} />);
};

describe('InputWrapper', () => {
  describe('"invalid" prop', () => {
    it('if false, should not render things with error color', () => {
      const wrapper = getWrapper({
        label: 'Test',
        helperText: 'Test',
      });

      expect(wrapper.find('label.label').hasClass('invalid')).toBe(false);
      expect(wrapper.find('Text.helperText').prop('color')).toBe(undefined);
    });

    it('if true, should render things with error color', () => {
      const wrapper = getWrapper({
        invalid: true,
        label: 'Test',
        helperText: 'Test',
      });

      expect(wrapper.find('label.label').hasClass('invalid')).toBe(true);
      expect(wrapper.find('Text.helperText').prop('color')).toBe('critical');
    });
  });

  describe('"helperText" prop', () => {
    it('if not provided, should not show helper text', () => {
      const wrapper = getWrapper();

      expect(wrapper.find('Text.helperText')).toHaveLength(0);
    });

    it('if provided, should show helper text', () => {
      const wrapper = getWrapper({
        helperText: 'Test',
      });

      expect(wrapper.find('Text.helperText')).toHaveLength(1);
    });
  });

  describe('"label" prop', () => {
    it('when provided, should be shown', () => {
      const wrapper = getWrapper({
        label: 'Upload Service',
      });

      expect(wrapper.find('label.label').text()).toEqual('Upload Service');
    });

    it('when provided, should not be shown', () => {
      const wrapper = getWrapper();

      expect(wrapper.find('label.label')).toHaveLength(0);
    });
  });
});
