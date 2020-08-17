import React from 'react';
import { shallow } from 'enzyme';

import WinterStorageAreaCard from '../WinterStorageAreaCard';

describe('WinterStorageAreaCard', () => {
  it('renders correctly with minimum props', () => {
    const wrapper = shallow(
      <WinterStorageAreaCard
        electricity={false}
        gate={false}
        imageFile={null}
        maps={[]}
        municipality={null}
        name={'name'}
        numberOfCustomers={0}
        streetAddress={null}
        summerStorageForBoats={false}
        summerStorageForDockingEquipment={false}
        summerStorageForTrailers={false}
        water={false}
        wwwUrl={'https://www.hel.fi'}
        zipCode={'00000'}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const wrapper = shallow(
      <WinterStorageAreaCard
        className={'test'}
        electricity={true}
        gate={true}
        imageFile={'https://www.hel.fi'}
        maps={[
          {
            id: 'test',
            url: 'https://www.hel.fi',
          },
        ]}
        municipality={'municipality'}
        name={'name'}
        numberOfCustomers={0}
        streetAddress={'street'}
        summerStorageForBoats={true}
        summerStorageForDockingEquipment={true}
        summerStorageForTrailers={true}
        water={true}
        wwwUrl={'https://www.hel.fi'}
        zipCode={'00000'}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
