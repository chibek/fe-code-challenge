export const formatCurrency = (value: number) => {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(0)}M`;
  } else {
    return `$${Math.round(value)}`;
  }
};
