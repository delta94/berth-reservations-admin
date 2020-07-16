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
