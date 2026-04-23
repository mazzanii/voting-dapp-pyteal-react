/**
 * Weather service providing contextual data alongside voting.
 * Demonstrates the service layer pattern from CN6035 Week 3.
 * Uses mock data (same approach as the module's weather_api tutorial).
 */

const weatherConditions = [
  "Clear", "Partly Cloudy", "Overcast", "Light Rain",
  "Heavy Rain", "Fog", "Windy", "Snow",
];

const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  london: { lat: 51.5074, lon: -0.1278 },
  dublin: { lat: 53.3498, lon: -6.2603 },
  paris: { lat: 48.8566, lon: 2.3522 },
  berlin: { lat: 52.52, lon: 13.405 },
  tokyo: { lat: 35.6762, lon: 139.6503 },
  "new-york": { lat: 40.7128, lon: -74.006 },
};

export const generateWeatherData = (city: string): WeatherData => {
  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    city,
    temperature: randomInt(-5, 35),
    humidity: randomInt(30, 95),
    wind: randomInt(0, 80),
    condition:
      weatherConditions[randomInt(0, weatherConditions.length - 1)],
  };
};

export const getSupportedCities = (): string[] => {
  return Object.keys(cityCoordinates);
};

export const isValidCity = (city: string): boolean => {
  return city.toLowerCase() in cityCoordinates;
};
