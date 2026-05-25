export const extractMoneyValues = (text: string): number[] => {
  const matches = text.match(/(?:€|\$|£)?\s*\d+(?:[.,]\d{2})/g) ?? [];

  return matches.map((value) => Number(value.replace(/[^\d.,-]/g, '').replace(',', '.')));
};
