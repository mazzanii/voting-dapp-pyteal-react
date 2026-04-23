import { Router, Request, Response } from "express";
import {
  generateWeatherData,
  getSupportedCities,
  isValidCity,
} from "../services/weatherService";

const weatherRoute = Router();

// GET /api/weather - List supported cities
weatherRoute.get("/", (_req: Request, res: Response) => {
  res.json({ cities: getSupportedCities() });
});

// GET /api/weather/:city - Get weather for a city
weatherRoute.get("/:city", (req: Request, res: Response) => {
  const city = req.params.city.toLowerCase();
  if (!isValidCity(city)) {
    res.status(404).json({
      error: `City '${city}' not supported. Available: ${getSupportedCities().join(", ")}`,
    });
    return;
  }
  res.json(generateWeatherData(city));
});

export default weatherRoute;
