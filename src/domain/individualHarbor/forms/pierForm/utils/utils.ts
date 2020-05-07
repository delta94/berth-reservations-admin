import { BOAT_TYPES } from '../__generated__/BOAT_TYPES';
import { BoatType } from '../../types';

export const getBoatTypes = (data: BOAT_TYPES | undefined): BoatType[] => {
  if (!data || !data.boatTypes) return [];
  return data.boatTypes;
};
