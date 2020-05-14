import React from 'react';
import { shallow } from 'enzyme';

import FileUpload, { FileUploadProps } from '../FileUpload';

describe('FileUpload', () => {
  const mockProps: FileUploadProps = {
    name: 'test',
    onChange: jest.fn(),
    value: new File([], 'test.jpg'),
  };

  const getWrapper = (props?: Partial<FileUploadProps>) => {
    const wrapperProps = { ...mockProps, ...props };
    return shallow(<FileUpload {...(wrapperProps as FileUploadProps)} />);
  };

  it('renders normally', () => {
    const wrapper = getWrapper();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('"disabled" prop', () => {
    it('when true, component is disabled', () => {
      const wrapper = getWrapper({
        disabled: true,
      });
      expect(wrapper.find('FileUploadButton').prop('disabled')).toEqual(true);
      expect(wrapper.find('input').prop('disabled')).toEqual(true);
    });

    it('when false, component is enabled', () => {
      const wrapper = getWrapper({
        disabled: false,
      });
      expect(wrapper.find('FileUploadButton').prop('disabled')).toEqual(false);
      expect(wrapper.find('input').prop('disabled')).toEqual(false);
    });
  });

  describe('"label" prop', () => {
    it('when provided, should be shown', () => {
      const wrapper = getWrapper({
        label: 'Upload Service',
      });
      expect(wrapper.find('span.labelText').text()).toEqual('Upload Service');
    });
  });

  describe('"maxSize" prop', () => {
    describe('when provided', () => {
      it('max size message should be shown', () => {
        const wrapper = getWrapper({
          maxSize: 3 * 1000 * 1000,
        });
        expect(wrapper.find('Text.maxSize').render().text()).toEqual('Tiedostokoko alle 3 MB');
      });

      it('files over "maxSize" should be styled', () => {
        const wrapper = getWrapper({
          maxSize: 3 * 1000 * 1000,
          value: {
            name: 'test.jpg',
            size: 4 * 1000 * 1000,
          } as File,
        });
        expect(wrapper.find('li.fileListItem').at(0).find('Text').hasClass('fileOverMaxSize')).toBe(true);
      });

      it('files under "maxSize" should not be styled', () => {
        const wrapper = getWrapper({
          maxSize: 3 * 1000 * 1000,
          value: {
            name: 'test.jpg',
            size: 2 * 1000 * 1000,
          } as File,
        });
        expect(wrapper.find('li.fileListItem').at(0).find('Text').hasClass('fileOverMaxSize')).toBe(false);
      });
    });

    describe('when not provided', () => {
      it('max size message should not be shown', () => {
        const wrapper = getWrapper();
        expect(wrapper.find('Text.maxSize').length).toBe(0);
      });

      it('files should not be styled', () => {
        const wrapper = getWrapper({
          value: {
            name: 'test.jpg',
            size: 5 * 1000 * 1000,
          } as File,
        });
        expect(wrapper.find('li.fileListItem').at(0).find('Text').hasClass('fileOverMaxSize')).toBe(false);
      });
    });
  });

  describe('"multiple" prop', () => {
    describe('when true', () => {
      it('multiple is passed to input', () => {
        const wrapper = getWrapper({
          multiple: true,
          value: undefined,
        });
        expect(wrapper.find('input').prop('multiple')).toEqual(true);
      });
      it('component should accept array value', () => {
        const wrapper = getWrapper({
          multiple: true,
          value: [new File([], 'test1.jpg'), new File([], 'test2.jpg')],
        });
        expect(wrapper.find('li.fileListItem').at(0).find('Text').render().text()).toEqual('test1.jpg');
        expect(wrapper.find('li.fileListItem').at(1).find('Text').render().text()).toEqual('test2.jpg');
      });
    });

    describe('when false or not provided', () => {
      it('multiple is not passed to input', () => {
        const wrapper = getWrapper({
          multiple: false,
        });
        expect(wrapper.find('input').prop('multiple')).toEqual(false);
      });
      it('component should accept single value', () => {
        const wrapper = getWrapper({
          multiple: false,
          value: new File([], 'test.jpg'),
        });
        expect(wrapper.find('li.fileListItem').at(0).find('Text').render().text()).toEqual('test.jpg');
      });
    });
  });

  describe('"onChange" prop', () => {
    it('if event is invalid, should not be called', () => {
      const mockChange = jest.fn();
      const wrapper = getWrapper({
        onChange: mockChange,
      });
      wrapper.find('input').simulate('change', {
        currentTarget: {},
      });
      expect(mockChange).not.toHaveBeenCalled();
    });

    describe('if "multiple" is false', () => {
      it('when input changes, should be called with new single File', () => {
        const mockChange = jest.fn();
        const mockOldFile = new File([], 'old.jpg');
        const mockNewFile = new File([], 'new.jpg');
        const wrapper = getWrapper({
          onChange: mockChange,
          value: mockOldFile,
        });
        wrapper.find('input').simulate('change', {
          currentTarget: { files: [mockNewFile] },
        });
        expect(mockChange).toHaveBeenCalledWith(mockNewFile);
      });
    });

    describe('if "multiple" is true', () => {
      it('when input changes, should be called with old and new File(s) as array', () => {
        const mockChange = jest.fn();
        const mockOldFile = new File([], 'old.jpg');
        const mockNewFile1 = new File([], 'new1.jpg');
        const mockNewFile2 = new File([], 'new2.jpg');
        const wrapper = getWrapper({
          onChange: mockChange,
          value: [mockOldFile],
          multiple: true,
        });
        wrapper.find('input').simulate('change', {
          currentTarget: { files: [mockNewFile1, mockNewFile2] },
        });
        expect(mockChange).toHaveBeenCalledWith([mockOldFile, mockNewFile1, mockNewFile2]);
      });

      it('if value is undefined, when input changes, should be called with new File(s) as array', () => {
        const mockChange = jest.fn();
        const mockNewFile1 = new File([], 'new1.jpg');
        const mockNewFile2 = new File([], 'new2.jpg');
        const wrapper = getWrapper({
          onChange: mockChange,
          value: undefined,
          multiple: true,
        });
        wrapper.find('input').simulate('change', {
          currentTarget: { files: [mockNewFile1, mockNewFile2] },
        });
        expect(mockChange).toHaveBeenCalledWith([mockNewFile1, mockNewFile2]);
      });
    });
  });

  describe('"remove" function', () => {
    it('if "multiple" is false, should replace value with undefined', () => {
      const mockChange = jest.fn();
      const wrapper = getWrapper({
        onChange: mockChange,
      });
      wrapper.find('button.delete').simulate('click');
      expect(mockChange).toHaveBeenCalledWith(undefined);
    });

    it('if "multiple" is true, should delete target from list', () => {
      const mockChange = jest.fn();
      const mockFile0 = new File([], '0.jpg');
      const mockFile1 = new File([], '1.jpg');
      const wrapper = getWrapper({
        onChange: mockChange,
        value: [mockFile0, mockFile1],
        multiple: true,
      });
      wrapper.find('button.delete').at(1).simulate('click');
      expect(mockChange).toHaveBeenCalledWith([mockFile0]);
    });
  });
});
