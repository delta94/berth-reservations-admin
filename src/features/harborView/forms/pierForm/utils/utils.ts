import { BOAT_TYPES } from '../__generated__/BOAT_TYPES';
import { BoatType, Pier } from '../../types';
import { PIER_AND_BOAT_TYPES } from '../__generated__/PIER_AND_BOAT_TYPES';

export const getBoatTypes = (data: BOAT_TYPES | undefined): BoatType[] => {
  if (!data || !data.boatTypes) return [];
  return data.boatTypes;
};

export const getPier = (data: PIER_AND_BOAT_TYPES | undefined): Pier => {
  if (!data || !data?.pier?.properties) return {};
  const {
    identifier,
    mooring,
    wasteCollection,
    lighting,
    electricity,
    water,
    gate,
    personalElectricity,
  } = data.pier.properties;
  return {
    identifier,
    mooring,
    wasteCollection,
    lighting,
    electricity,
    water,
    gate,
    personalElectricity,
    suitableBoatTypes: data.pier.properties.suitableBoatTypes.map((boatType) => boatType.id),
  };
};
