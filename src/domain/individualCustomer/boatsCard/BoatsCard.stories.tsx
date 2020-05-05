import React from 'react';

import BoatsCard from './BoatsCard';
import { Boat, LargeBoat } from '../types';
import { inspectionCert, insuraceCert } from './__fixtures__/mockData';

export default {
  component: BoatsCard,
  title: 'BoatsCard',
  decorators: [
    storyFn => <div style={{ backgroundColor: 'lightgrey' }}>{storyFn()}</div>,
  ],
};

const boat: Boat = {
  id: '1111',
  boatType: {
    id: '7',
    name: 'Troolari',
  },
  width: 2,
  length: 10,
  draught: 2,
  weight: 15000,
  name: 'Huh hah hei',
  model: 'Trawl 11',
  registrationNumber: 'TRLR-555',
};

const largeBoat: LargeBoat = {
  id: '9999',
  boatType: {
    id: '8',
    name: 'Suuri alus (yli 20t)',
  },
  width: 4,
  length: 15,
  draught: 2,
  weight: 15000,
  name: 'DevilsDriver',
  model: 'Trawl 77',
  registrationNumber: 'TRLR-666',
  propulsion: 'Bensin',
  hullMaterial: 'Aluminium',
  intendedUse: 'For fun',
  certificates: [inspectionCert, insuraceCert],
};

export const oneBoat = () => <BoatsCard boats={[boat]} />;

export const multipleBoats = () => <BoatsCard boats={[boat, boat]} />;

export const withLargeBoat = () => <BoatsCard boats={[boat, largeBoat]} />;
