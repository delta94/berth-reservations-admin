import React from 'react';
import { mount } from 'enzyme';

import { CustomerMessageForm, CustomerMessageFormProps } from '../CustomerMessageForm';
import { mockHtml } from '../__fixtures__/mockData';

const mockProps: CustomerMessageFormProps = {
  handleCancel: jest.fn(),
  handleCancelPreview: jest.fn(),
  handlePreview: jest.fn(),
  handleSendMessage: jest.fn(),
  previewHtml: undefined,
  recipientCount: 1,
  templateOptions: [
    {
      value: 'MOCK-TEMPLATE',
      label: 'TestTemplate',
    },
  ],
};

describe('CustomerMessageForm', () => {
  const getWrapper = (props?: Partial<CustomerMessageFormProps>) =>
    mount(<CustomerMessageForm {...mockProps} {...props} />);

  it('renders normally in edit mode', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders normally in preview mode', () => {
    const wrapper = getWrapper({
      previewHtml: mockHtml,
    });

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should call handleSendMessage when form is submitted', () => {
    const handleSendMessage = jest.fn();
    const wrapper = getWrapper({
      handleSendMessage,
    });

    const onSubmit = wrapper.find('Formik').prop('onSubmit') as Function;
    onSubmit();
    wrapper.update();

    expect(handleSendMessage).toHaveBeenCalled();
  });

  it('should call handlePreview when preview button is clicked', () => {
    const handlePreview = jest.fn();
    const wrapper = getWrapper({
      handlePreview,
    });

    wrapper.find('Button').at(1).simulate('click');

    expect(handlePreview).toHaveBeenCalledWith('MOCK-TEMPLATE');
  });
});
