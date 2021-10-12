export const getTodayTimeRange = (
  year: number,
  month: number,
  date: number
) => {
  const d = new Date(`${year}-${month}-${date}`);

  d.setHours(0, 0, 0, 0);
  const startAt = d.getTime();

  d.setHours(24, 0, 0, 0);
  const endAt = d.getTime();

  return [startAt, endAt];
};
