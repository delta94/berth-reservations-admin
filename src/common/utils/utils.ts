export const covertToString = (value: unknown, fallback = '') => {
  if (!value) return fallback;

  return String(value);
};

export const convertCmToM = (value: number) => value / 100;
