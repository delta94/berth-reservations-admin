import React from 'react';
import { shallow } from 'enzyme';

import WinterStorageAreaCard from '../WinterStorageAreaCard';

describe('WinterStorageAreaCard', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <WinterStorageAreaCard
        name={'name'}
        gate={true}
        electricity={true}
        servicemapId={'12345'}
        streetAddress={'street'}
        zipCode={'00000'}
        municipality={'municipality'}
        imageFile={''}
        maps={[]}
        numberOfCustomers={0}
        summerStorageForBoats={false}
        summerStorageForDockingEquipment={true}
        summerStorageForTrailers={false}
        water={true}
        wwwUrl={'www.google.com'}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
