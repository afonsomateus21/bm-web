export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const unformatPrice = (value: string): number => {
  return Number(value.replace(/[^0-9]/g, '')) / 100;
};

export const isValidPrice = (value: number): boolean => {
  return !isNaN(value) && value >= 0;
};

export const formatPriceWithoutSymbol = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatPriceRange = (min: number, max: number): string => {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
};