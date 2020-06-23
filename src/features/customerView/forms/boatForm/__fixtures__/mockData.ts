import { BoatType } from '../../../../harborView/forms/types';
import { Boat } from '../../../types';

export const mockBoatTypes: BoatType[] = [{ id: '1', name: 'Purjevene' }];

export const mockValidValues: Boat = {
  boatType: mockBoatTypes[0],
  id: 'id',
  model: 'model',
  name: 'name',
  registrationNumber: '123456',
  weight: 1,
  width: 1,
  length: 1,
  draught: 1,
};

export const mockInvalidValues: Boat = {
  boatType: mockBoatTypes[0],
  id: 'id',
  model: 'model',
  name: 'name',
  registrationNumber: '',
  weight: -10,
  width: 1,
  length: 1,
  draught: 1,
};
