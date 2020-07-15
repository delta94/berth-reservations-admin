// Note: Returns 'true' if value is undefined, as 'required' is tested separately
export const isNumber = (value: string | undefined): boolean => {
  if (value === undefined) return true;

  const numberRegex = new RegExp('^-?\\d+([.,]\\d+)?$');
  return numberRegex.test(value);
};

// Note: Returns 'true' if value is undefined, as 'required' is tested separately
export const isPositive = (value: string | undefined): boolean => {
  if (value === undefined) return true;

  return parseFloat(value.replace(',', '.')) >= 0;
};

export const replaceCommaWithDot = (value: string): string => {
  return String(value).replace(',', '.');
};

export const replaceDotWithComma = (value: string): string => {
  return String(value).replace('.', ',');
};
