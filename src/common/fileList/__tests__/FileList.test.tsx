import React from 'react';
import { shallow } from 'enzyme';

import FileList, { FileListProps } from '../FileList';

const createMockFile = (id: string, markedForDeletion?: boolean) => ({
  name: `testFile${id}.pdf`,
  id: id,
  markedForDeletion,
});

const mockPropsSingle: FileListProps = {
  id: 'single',
  onChange: jest.fn(),
  value: createMockFile('1'),
};

const mockPropsMultiple: FileListProps = {
  id: 'multiple',
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
      labelText: 'Test',
      allowDelete: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders normally with multiple files props', () => {
    const wrapper = getWrapper({
      ...mockPropsMultiple,
      labelText: 'Test',
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
          id: 'multiple',
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
          id: 'multiple',
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
