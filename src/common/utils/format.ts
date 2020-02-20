export const formatDimension = (value: number | null, locale: string) => {
  if (!value) return null;

  const localizedValues = new Intl.NumberFormat([locale, 'fi-FI'], {
    style: 'decimal',
    minimumFractionDigits: 1,
  }).format(value);

  return `${localizedValues} m`;
};

export const formatWeight = (value: number | null, locale: string) => {
  if (!value) return null;

  const localizedValues = new Intl.NumberFormat([locale, 'fi-FI'], {
    style: 'decimal',
  }).format(value);

  return `${localizedValues} kg`;
};

export const formatDate = (date: string, locale: string) =>
  new Date(date).toLocaleString([locale, 'fi-FI']);
