export const hasLength = (element: Element) => {
  if (!element.textContent) {
    return false;
  }

  const text = element.textContent.trim();
  return text.length > 0;
};

export const hasPrice = (element: Element) => {
  if (!element.textContent) {
    return false;
  }

  const priceIntegerPart = element.textContent.split(',')[0];
  const price = Number(priceIntegerPart);
  return price > 0;
};
