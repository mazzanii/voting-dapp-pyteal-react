import express from "express";
import cors from "cors";
import votingRoute from "./routes/votingRoute";
import weatherRoute from "./routes/weatherRoute";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for frontend communication (Week 5-6 pattern)

// Routes — API Gateway pattern (Week 4)
// All services accessible through a single entry point
app.use("/api/voting", votingRoute);
app.use("/api/weather", weatherRoute);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Voting DApp Backend (CN6035 Enhancement)",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Root — API documentation
app.get("/", (_req, res) => {
  res.json({
    message: "Voting DApp Backend API",
    description: "Express/TypeScript enhancement for gconnect/voting-dapp-pyteal-react",
    endpoints: {
      "GET /api/voting/results": "Current election results from blockchain",
      "GET /api/voting/results/:appId": "Results for a specific app",
      "GET /api/voting/candidates": "List of candidates",
      "GET /api/voting/verify/:txId": "Verify a vote transaction",
      "GET /api/weather/:city": "Weather data for a city",
      "GET /api/weather": "List supported cities",
      "GET /api/health": "Health check",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Voting DApp Backend running on port ${PORT}`);
});
