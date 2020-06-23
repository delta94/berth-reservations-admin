import { INDIVIDUAL_BERTH } from '../__generated__/INDIVIDUAL_BERTH';
import { Berth } from '../../types';

export const getBerth = (berthData: INDIVIDUAL_BERTH | undefined): Berth | undefined => {
  if (!berthData || !berthData.berth) return undefined;
  const { number, comment, isActive, mooringType, width, length, depth } = berthData.berth;
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

export const isNumber = (value: string | undefined): boolean => {
  if (value === undefined) return true; // required is a separate test
  const numberRegex = new RegExp('^-?\\d+([.,]\\d+)?$');
  return numberRegex.test(value);
};

export const isPositive = (value: string | undefined): boolean => {
  if (value === undefined) return true; // required is a separate test
  return parseFloat(value.replace(',', '.')) >= 0;
};

export const replaceCommaWithDot = (value: string): string => {
  return String(value).replace(',', '.');
};

export const replaceDotWithComma = (value: string): string => {
  return String(value).replace('.', ',');
};
