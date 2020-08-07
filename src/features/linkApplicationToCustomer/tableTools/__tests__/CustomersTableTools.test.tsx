import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { TextInput } from 'hds-react';

import CustomersTableTools, { CustomersTableToolsProps } from '../CustomersTableTools';
import Select from '../../../../common/select/Select';

const searchByOptions = [
  {
    value: 'firstName',
    label: 'Etunimi',
  },
  {
    value: 'lastName',
    label: 'Sukunimi',
  },
  {
    value: 'email',
    label: 'Sähköposti',
  },
  {
    value: 'address',
    label: 'Osoite',
  },
];

const mockProps: CustomersTableToolsProps<string> = {
  className: '',
  searchBy: '',
  searchByOptions: searchByOptions,
  searchVal: undefined,
  setSearchBy: jest.fn(),
  handleCreateCustomer: jest.fn(),
  handleLinkCustomer: jest.fn(),
  setSearchVal: jest.fn(),
};

describe('CustomersTableTools', () => {
  const getWrapper = (props?: Partial<CustomersTableToolsProps<string>>) =>
    mount(<CustomersTableTools {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('calls setSearchBy when select value is changed', async () => {
    const setSearchBy = jest.fn();
    const wrapper = getWrapper({ setSearchBy });

    const onChange = wrapper.find(Select).prop('onChange') as ChangeEventHandler<HTMLInputElement>;
    await act(async () => {
      await onChange({ target: { value: 'Bb' } } as ChangeEvent<HTMLInputElement>);
    });
    wrapper.update();

    expect(setSearchBy).toHaveBeenCalledWith('Bb');
  });

  it('calls setSearchVal when input value is changed', async () => {
    const setSearchVal = jest.fn();
    const wrapper = getWrapper({ setSearchVal });

    const onChange = wrapper.find(TextInput).prop('onChange') as ChangeEventHandler<HTMLInputElement>;
    await act(async () => {
      await onChange({ target: { value: 'Aapeli' } } as ChangeEvent<HTMLInputElement>);
    });
    wrapper.update();

    expect(setSearchVal).toHaveBeenCalledWith('Aapeli');
  });
});
