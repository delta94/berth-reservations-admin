import { INDIVIDUAL_BERTH } from '../__generated__/INDIVIDUAL_BERTH';
import { Berth } from '../types';

export const getBerth = (berthData: INDIVIDUAL_BERTH | undefined): Berth => {
  if (!berthData || !berthData.berth) return {};
  const {
    number,
    comment,
    isActive,
    mooringType,
    width,
    length,
    depth,
  } = berthData.berth;
  return {
    number,
    comment,
    isActive,
    mooringType,
    width,
    length,
    depth,
    pierId: berthData.berth.pier.id,
    pier: berthData.berth.pier.properties?.identifier,
  };
};
