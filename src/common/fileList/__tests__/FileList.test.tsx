import React from 'react';
import { shallow } from 'enzyme';

import FileList, { FileListProps } from '../FileList';

const createMockFile = (id: string, markedForDeletion?: boolean) => ({
  name: `testFile${id}.pdf`,
  id: id,
  markedForDeletion,
});

const mockPropsSingle: FileListProps = {
  name: 'single',
  onChange: jest.fn(),
  value: createMockFile('1'),
};

const mockPropsMultiple: FileListProps = {
  name: 'multiple',
  multiple: true,
  onChange: jest.fn(),
  value: [createMockFile('1'), createMockFile('2')],
};

const getWrapper = (props?: Partial<FileListProps>) => {
  const wrapperProps = { ...mockPropsSingle, ...props };
  return shallow(<FileList {...(wrapperProps as FileListProps)} />);
};

describe('FileList', () => {
  it('renders null without value', () => {
    const wrapper = getWrapper({
      value: undefined,
    });

    expect(wrapper.html()).toBeNull();
  });

  it('renders normally with single file props', () => {
    const wrapper = getWrapper({
      label: 'Test',
      allowDelete: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders normally with multiple files props', () => {
    const wrapper = getWrapper({
      ...mockPropsMultiple,
      label: 'Test',
      allowDelete: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('"allowDelete" prop', () => {
    it('if false, should not show delete buttons', () => {
      const wrapper = getWrapper({ allowDelete: false });

      expect(wrapper.find('button.delete')).toHaveLength(0);
    });

    it('if true, should show delete buttons', () => {
      const wrapper = getWrapper({ allowDelete: true });

      expect(wrapper.find('button.delete')).toHaveLength(1);
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

  describe('"invalid" prop', () => {
    it('if false, should not render things with error color', () => {
      const wrapper = getWrapper({
        label: 'Test',
        helperText: 'Test',
      });

      expect(wrapper.find('span.labelText').hasClass('invalid')).toBe(false);
      expect(wrapper.find('Text.helperText').prop('color')).toBe(undefined);
    });

    it('if true, should render things with error color', () => {
      const wrapper = getWrapper({
        invalid: true,
        label: 'Test',
        helperText: 'Test',
      });

      expect(wrapper.find('span.labelText').hasClass('invalid')).toBe(true);
      expect(wrapper.find('Text.helperText').prop('color')).toBe('critical');
    });
  });

  describe('"label" prop', () => {
    it('when provided, should be shown', () => {
      const wrapper = getWrapper({
        label: 'Upload Service',
      });

      expect(wrapper.find('span.labelText').text()).toEqual('Upload Service');
    });

    it('when provided, should not be shown', () => {
      const wrapper = getWrapper();

      expect(wrapper.find('span.labelText')).toHaveLength(0);
    });
  });

  describe('"willBeOverwritten" prop', () => {
    it('if false, should not render files with passive color', () => {
      const wrapper = getWrapper();

      expect(wrapper.find('Text.markedForDeletion')).toHaveLength(0);
    });

    it('if true, should render files with passive color', () => {
      const wrapper = getWrapper({
        willBeOverwritten: true,
      });

      expect(wrapper.find('Text.markedForDeletion')).toHaveLength(1);
    });
  });

  describe('"markedForDeletion" file property', () => {
    it('if false, should not render files with passive color', () => {
      const wrapper = getWrapper({
        value: createMockFile('1'),
      });

      expect(wrapper.find('Text.markedForDeletion')).toHaveLength(0);
    });

    it('if true, should render files with passive color', () => {
      const wrapper = getWrapper({
        value: createMockFile('1', true),
      });

      expect(wrapper.find('Text.markedForDeletion')).toHaveLength(1);
    });
  });

  describe('when "delete" button is clicked', () => {
    describe('if "multiple" is true', () => {
      it('should toggle target file deletion from false to true', () => {
        const mockChange = jest.fn();
        const wrapper = getWrapper({
          allowDelete: true,
          multiple: true,
          name: 'multiple',
          onChange: mockChange,
          value: [createMockFile('0', false), createMockFile('1', false)],
        });

        wrapper.find('button.delete').at(1).simulate('click');

        expect(mockChange).toHaveBeenCalledWith([createMockFile('0', false), createMockFile('1', true)]);
      });

      it('should toggle target file deletion from true to false', () => {
        const mockChange = jest.fn();
        const wrapper = getWrapper({
          allowDelete: true,
          multiple: true,
          name: 'multiple',
          onChange: mockChange,
          value: [createMockFile('0', false), createMockFile('1', true)],
        });

        wrapper.find('button.delete').at(1).simulate('click');

        expect(mockChange).toHaveBeenCalledWith([createMockFile('0', false), createMockFile('1', false)]);
      });
    });

    describe('if "multiple" is false', () => {
      it('should toggle target file deletion from false to true', () => {
        const mockChange = jest.fn();
        const wrapper = getWrapper({
          allowDelete: true,
          onChange: mockChange,
          value: createMockFile('0'),
        });

        wrapper.find('button.delete').simulate('click');

        expect(mockChange).toHaveBeenCalledWith(createMockFile('0', true));
      });

      it('should toggle target file deletion from true to false', () => {
        const mockChange = jest.fn();
        const wrapper = getWrapper({
          allowDelete: true,
          onChange: mockChange,
          value: createMockFile('0', true),
        });

        wrapper.find('button.delete').simulate('click');

        expect(mockChange).toHaveBeenCalledWith(createMockFile('0', false));
      });
    });
  });
});
