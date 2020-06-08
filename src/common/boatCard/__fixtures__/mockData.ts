import { Boat } from '../types';

export const mockBoat: Boat = {
  boatType: '',
  boatRegistrationNumber: 'registration number',
  boatName: 'name',
  boatModel: 'model',
  boatWidth: 3,
  boatLength: 7,
  boatDraught: 2,
  boatWeight: 600,
};

export const mockBoatWithMissingFields: Boat = {
  boatType: '',
  boatRegistrationNumber: 'registration number',
  boatName: null,
  boatModel: null,
  boatWidth: 3,
  boatLength: 7,
  boatDraught: 2,
  boatWeight: null,
};
