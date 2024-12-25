const adjustBrightness = (percentage: number): string => {
  const baseHue = 220; // Hue of #c1d3fe
  const baseSat = 95; // Saturation of #c1d3fe
  const baseLightness = 88; // Lightness of #c1d3fe

  // Adjust lightness while keeping hue and saturation
  const newLightness = Math.max(20, Math.min(95, baseLightness - percentage));

  return `hsl(${baseHue}, ${baseSat}%, ${newLightness}%)`;
};

export const getRandomColor = () => {
  const variation = Math.floor(Math.random() * 30); // 0-30% variation
  return adjustBrightness(variation);
};

export const transformData = (data: Record<string, number>) =>
  Object.entries(data).map(([country, clicks]) => ({
    name: country,
    value: clicks,
    fill: getRandomColor(),
  }));
