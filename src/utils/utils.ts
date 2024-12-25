// Generate random color for each country
export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;

export const transformData = (data: Record<string, number>) =>
  Object.entries(data).map(([country, clicks]) => ({
    name: country,
    value: clicks,
    fill: getRandomColor(),
  }));
