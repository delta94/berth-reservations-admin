import React from 'react';
import { mount } from 'enzyme';

import { NotificationTemplate } from '../types';
import { mockHtml } from '../__fixtures__/mockData';
import { CustomerMessageForm, CustomerMessageFormProps } from '../CustomerMessageForm';

const mockTemplate: NotificationTemplate = {
  id: 'MOCK-TEMPLATE',
  preview: mockHtml,
  translations: {
    FI: { bodyHtml: mockHtml, bodyText: 'TEST TEST TEST', preview: mockHtml, subject: 'Testipohja' },
    SV: { bodyHtml: mockHtml, bodyText: 'TEST TEST TEST', preview: mockHtml, subject: 'Testmall' },
    EN: { bodyHtml: mockHtml, bodyText: 'TEST TEST TEST', preview: mockHtml, subject: 'Test template' },
  },
  type: 'TestTemplate',
};

const mockProps: CustomerMessageFormProps = {
  handleCancel: jest.fn(),
  handlePreview: jest.fn(),
  handleSendMessage: jest.fn(),
  templates: [mockTemplate],
};

describe('CustomerMessageForm', () => {
  const getWrapper = (props?: Partial<CustomerMessageFormProps>) =>
    mount(<CustomerMessageForm {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

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

    expect(handlePreview).toHaveBeenCalledWith(mockTemplate.id);
  });
});
