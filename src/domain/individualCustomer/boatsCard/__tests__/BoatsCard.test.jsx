import React from 'react';
import { shallow } from 'enzyme';

import BoatsCard from '../BoatsCard';

const mockProps = {
  boats: [
    {
      id: '1234',
      boatType: 'Purjevene / moottoripursi',
      registrationNumber: 'A 12345',
      boatWidth: '3,2 m',
      boatLength: '6 m',
      boatDepth: '0,8 m',
      boatWeight: '350 kg',
      boatName: 'Cama la Yano',
      boatBrand: 'Marine',
    },
    {
      id: '5432',
      boatType: 'Purjevene / moottoripursi',
      registrationNumber: 'A 67890',
      boatWidth: '2,3 m',
      boatLength: '4 m',
      boatDepth: '0,8 m',
      boatWeight: '200 kg',
      boatName: 'Huh hah hei',
      boatBrand: 'Boaty',
    },
    {
      id: '9999',
      boatType: 'Suuri alus (yli 20t)',
      registrationNumber: 'A 67890',
      boatWidth: '5,5 m',
      boatLength: '22 m',
      boatDepth: '1,5 m',
      boatWeight: '24 000 kg',
      boatName: 'Caraboudjan',
      boatBrand: 'Buster',
      boatPower: 'Polttoöljy',
      boatMaterial: 'Teräs',
      purpose:
        'Kalastus kesällä, muuten huviveneily ja joskus viedään anoppi katsomaan valaita',
      inspection:
        'Voimassa 31.12.2019 Tarkastettu 24.12.2018 Santtu Satamapäällikkö',
      insurance: 'Tarkastettu 24.12.2018 Santtu Satamapäällikkö',
    },
  ],
};

describe('BoatsCard', () => {
  const getWrapper = (props = mockProps) => shallow(<BoatsCard {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
