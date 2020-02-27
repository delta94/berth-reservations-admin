export const formatDimension = (value: number | null, locale: string) => {
  if (!value) return null;

  const localizedValues = new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 1,
  }).format(value);

  return `${localizedValues} m`;
};

export const formatWeight = (value: number | null, locale: string) => {
  if (!value) return null;

  const localizedValues = new Intl.NumberFormat(locale, {
    style: 'decimal',
  }).format(value);

  return `${localizedValues} kg`;
};

export const formatDate = (date: string, locale: string, withTime = false) => {
  const dateOpts = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const timeOpts = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const options = withTime ? { ...dateOpts, ...timeOpts } : dateOpts;

  return new Date(date).toLocaleString(locale, options);
};
