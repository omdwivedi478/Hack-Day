/**
 * Date formatting utilities
 */

export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const defaultOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options
  };

  return new Intl.DateTimeFormat('en-IN', defaultOptions).format(date);
};

export const formatDateTime = (dateString) => {
  return formatDate(dateString, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
