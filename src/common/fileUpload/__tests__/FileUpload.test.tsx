import React from 'react';
import { mount, shallow } from 'enzyme';
import { Button } from 'hds-react/lib';

import FileUpload, { FileUploadProps } from '../FileUpload';

describe('FileUpload', () => {
  const createMockFile = (name: string, size?: number) => {
    return {
      name,
      size: size || 10 * 1000,
    } as File;
  };

  const mockPropsSingle: FileUploadProps = {
    name: 'single',
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    value: createMockFile('test.jpg'),
  };

  const mockPropsMultiple: FileUploadProps = {
    name: 'multiple',
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    multiple: true,
    value: [createMockFile('test.jpg')],
  };

  const getWrapper = (props?: Partial<FileUploadProps>, useMount = false) => {
    const wrapperProps = { ...mockPropsSingle, ...props };
    if (useMount) {
      return mount(<FileUpload {...(wrapperProps as FileUploadProps)} />);
    }
    return shallow(<FileUpload {...(wrapperProps as FileUploadProps)} />);
  };

  it('renders normally with single file props', () => {
    const wrapper = getWrapper(mockPropsSingle);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders normally with multiple files props', () => {
    const wrapper = getWrapper(mockPropsMultiple);

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('"disabled" prop', () => {
    it('when true, component is disabled', () => {
      const wrapper = getWrapper({
        disabled: true,
      });

      expect(wrapper.find(Button).prop('disabled')).toEqual(true);
      expect(wrapper.find('input').prop('disabled')).toEqual(true);
    });

    it('when false, component is enabled', () => {
      const wrapper = getWrapper({
        disabled: false,
      });

      expect(wrapper.find(Button).prop('disabled')).toEqual(false);
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

        expect(wrapper.find('Text.maxSize').render().text()).toEqual('Tiedostokoko enintään 3 MB');
      });

      it('files over "maxSize" should be styled', () => {
        const wrapper = getWrapper({
          maxSize: 3 * 1000 * 1000,
          value: createMockFile('test.jpg', 4 * 1000 * 1000),
        });

        expect(wrapper.find('li.fileListItem').at(0).find('Text').hasClass('invalid')).toBe(true);
      });

      it('files under "maxSize" should not be styled', () => {
        const wrapper = getWrapper({
          maxSize: 3 * 1000 * 1000,
          value: createMockFile('test.jpg', 2 * 1000 * 1000),
        });

        expect(wrapper.find('li.fileListItem').at(0).find('Text').hasClass('invalid')).toBe(false);
      });
    });

    describe('when not provided', () => {
      it('max size message should not be shown', () => {
        const wrapper = getWrapper();

        expect(wrapper.find('Text.maxSize').length).toBe(0);
      });

      it('files should not be styled', () => {
        const wrapper = getWrapper({
          value: createMockFile('test.jpg', 5 * 1000 * 1000),
        });

        expect(wrapper.find('li.fileListItem').at(0).find('Text').hasClass('invalid')).toBe(false);
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
          value: [createMockFile('test1.jpg', 10 * 1000), createMockFile('test2.jpg', 10 * 1000)],
        });

        expect(wrapper.find('li.fileListItem').at(0).find('Text').render().text()).toEqual('test1.jpg (10 kB)');
        expect(wrapper.find('li.fileListItem').at(1).find('Text').render().text()).toEqual('test2.jpg (10 kB)');
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
          value: createMockFile('test.jpg', 10 * 1000),
        });

        expect(wrapper.find('li.fileListItem').at(0).find('Text').render().text()).toEqual('test.jpg (10 kB)');
      });
    });
  });

  describe('"onChange" prop', () => {
    it('if event is invalid, should not be called', () => {
      const mockChange = jest.fn();
      const wrapper = getWrapper(
        {
          name: 'test',
          onChange: mockChange,
        },
        true
      );

      const onChange = wrapper.find('input').prop('onChange') as Function;
      onChange({
        currentTarget: {},
      });

      expect(mockChange).not.toHaveBeenCalled();
    });

    describe('if "multiple" is true', () => {
      it('when input changes, should be called with old and new File(s) as array', () => {
        const mockChange = jest.fn();
        const mockOldFile = createMockFile('old.jpg');
        const mockNewFile1 = createMockFile('new1.jpg');
        const mockNewFile2 = createMockFile('new2.jpg');
        const wrapper = getWrapper(
          {
            name: 'test',
            onChange: mockChange,
            value: [mockOldFile],
            multiple: true,
          },
          true
        );

        const onChange = wrapper.find('input').prop('onChange') as Function;
        onChange({
          currentTarget: { files: [mockNewFile1, mockNewFile2] },
        });

        expect(mockChange).toHaveBeenCalledWith([mockOldFile, mockNewFile1, mockNewFile2]);
      });

      it('if value is undefined, when input changes, should be called with new File(s) as array', () => {
        const mockChange = jest.fn();
        const mockNewFile1 = createMockFile('new1.jpg');
        const mockNewFile2 = createMockFile('new2.jpg');
        const wrapper = getWrapper(
          {
            name: 'test',
            onChange: mockChange,
            value: undefined,
            multiple: true,
          },
          true
        );

        const onChange = wrapper.find('input').prop('onChange') as Function;
        onChange({
          currentTarget: { files: [mockNewFile1, mockNewFile2] },
        });

        expect(mockChange).toHaveBeenCalledWith([mockNewFile1, mockNewFile2]);
      });
    });

    describe('if "multiple" is false', () => {
      it('when input changes, should be called with new single File', () => {
        const mockChange = jest.fn();
        const mockOldFile = createMockFile('old.jpg');
        const mockNewFile = createMockFile('new.jpg');
        const wrapper = getWrapper(
          {
            name: 'test',
            onChange: mockChange,
            value: mockOldFile,
          },
          true
        );

        const onChange = wrapper.find('input').prop('onChange') as Function;
        onChange({
          currentTarget: { files: [mockNewFile] },
        });

        expect(mockChange).toHaveBeenCalledWith(mockNewFile);
      });
    });
  });

  describe('"delete" function', () => {
    describe('if "multiple" is true', () => {
      it('should delete it from list', () => {
        const mockChange = jest.fn();
        const mockFile0 = createMockFile('0.jpg');
        const mockFile1 = createMockFile('1.jpg');
        const wrapper = getWrapper(
          {
            onChange: mockChange,
            value: [mockFile0, mockFile1],
            multiple: true,
          },
          true
        );

        wrapper.find('button.delete').at(1).simulate('click');

        expect(mockChange).toHaveBeenCalledWith([mockFile0]);
      });
    });

    describe('if "multiple" is false', () => {
      it('should replace value with undefined', () => {
        const mockChange = jest.fn();
        const wrapper = getWrapper(
          {
            onChange: mockChange,
          },
          true
        );

        wrapper.find('button.delete').simulate('click');

        expect(mockChange).toHaveBeenCalledWith(undefined);
      });
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
    it('if false, should not render with error color', () => {
      const wrapper = getWrapper({
        helperText: 'Test',
      });

      expect(wrapper.find('span.labelText').hasClass('invalid')).toBe(false);
      expect(wrapper.find('Text.helperText').prop('color')).toBe(undefined);
    });

    it('if true, should render with error color', () => {
      const wrapper = getWrapper({
        invalid: true,
        helperText: 'Test',
      });

      expect(wrapper.find('span.labelText').hasClass('invalid')).toBe(true);
      expect(wrapper.find('Text.helperText').prop('color')).toBe('critical');
    });
  });
});
