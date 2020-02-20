export const formatDimension = (value: number | null, locale = 'fi-FI') => {
  if (!value) return null;

  const localizedValues = new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 1,
  }).format(value);

  return `${localizedValues} m`;
};

export const formatWeight = (value: number | null, locale = 'fi-FI') => {
  if (!value) return null;

  const localizedValues = new Intl.NumberFormat(locale, {
    style: 'decimal',
  }).format(value);

  return `${localizedValues} kg`;
};

export const formatDate = (date: string, locale = 'fi-FI') =>
  new Date(date).toLocaleString(locale);
