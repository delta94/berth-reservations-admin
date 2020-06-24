export const calcCompanyPrice = (privateCustomer: unknown) => {
  const numValue = Number(privateCustomer);

  if (Number.isNaN(numValue)) return null;

  return numValue * 2;
};
