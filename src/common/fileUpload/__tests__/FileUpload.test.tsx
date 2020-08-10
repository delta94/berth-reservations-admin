import React from 'react';
import { mount, shallow } from 'enzyme';

import FileUpload, { FileUploadProps } from '../FileUpload';
import Button from '../../button/Button';

const createMockFile = (name: string, size?: number) => {
  return {
    name,
    size: size || 10 * 1000,
  } as File;
};

const mockPropsSingle: FileUploadProps = {
  id: 'single',
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  value: createMockFile('test.jpg'),
};

const mockPropsMultiple: FileUploadProps = {
  id: 'multiple',
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

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('FileUpload', () => {
  it('renders normally with single file props', () => {
    const wrapper = getWrapper(mockPropsSingle);

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally with multiple files props', () => {
    const wrapper = getWrapper(mockPropsMultiple);

    expect(wrapper.render()).toMatchSnapshot();
  });

  describe('"buttonLabel" prop', () => {
    it('if not provided, should not change button label', () => {
      const wrapper = getWrapper();

      expect(wrapper.find(Button).render().text()).toEqual('Valitse...');
    });

    it('if provided, should show custom button label', () => {
      const wrapper = getWrapper({
        buttonLabel: 'Insert File',
      });

      expect(wrapper.find(Button).render().text()).toEqual('Insert File');
    });
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

  describe('when input changes', () => {
    it('if event is invalid, "onChange" should not be called', () => {
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
      it('when input changes, "onChange" should be called with old and new File(s) as array', () => {
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

      it('if value is undefined, when input changes, "onChange" should be called with new File(s) as array', () => {
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
      it('when input changes, "onChange" should be called with a new single File', () => {
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

  describe('when "add" button is clicked', () => {
    it('the event should be repeated to the file input', () => {
      const clickMock = jest.fn();
      const refMock = {
        current: {
          click: clickMock,
        },
      };
      const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue(refMock);

      const wrapper = getWrapper();

      wrapper.find(Button).simulate('click');

      expect(useRefSpy).toBeCalledTimes(1);
      expect(clickMock).toBeCalledTimes(1);
    });
  });

  describe('when "delete" button is clicked', () => {
    describe('if "multiple" is true', () => {
      it('should remove target file from value', () => {
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
});
