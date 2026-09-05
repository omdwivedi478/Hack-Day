/**
 * Currency formatting utilities for Indian Rupee (INR)
 */

export const formatINR = (amount, includePrefix = true) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return includePrefix ? '₹0' : '0';
  }

  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(amount);

  return includePrefix ? `₹${formatted}` : formatted;
};

export const formatPricePerUnit = (price, unit = 'kg') => {
  return `${formatINR(price)}/${unit}`;
};
