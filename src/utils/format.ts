export const currency = (n: number) =>
  n.toLocaleString(undefined, {
    style: "currency",
    currency: "SGD",
    maximumFractionDigits: 0,
  });
