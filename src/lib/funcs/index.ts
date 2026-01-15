export const toDDMMYYYY = (date: string): string => {
  if (!date) return "";

  const [yyyy, mm, dd] = date.split("-");
  return `${dd}-${mm}-${yyyy}`;
};
