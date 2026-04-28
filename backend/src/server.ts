import express from "express";
import cors from "cors";
import electionRoute from "./routes/electionRoute";
import votingRoute from "./routes/votingRoute";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api/election", electionRoute);
app.use("/api/voting", votingRoute);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Voting DApp Backend (CN6035 Enhancement)",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (_req, res) => {
  res.json({
    message: "Voting DApp Backend API",
    description: "Express/TypeScript enhancement for gconnect/voting-dapp-pyteal-react",
    endpoints: {
      "GET /api/election/candidates": "List all candidates with details",
      "GET /api/election/candidates/:id": "Get specific candidate info",
      "GET /api/election/rules": "Voting rules and blockchain details",
      "GET /api/voting/results": "Election results from blockchain",
      "GET /api/voting/candidates": "Candidate names from on-chain state",
      "GET /api/voting/verify/:txId": "Verify a vote transaction",
      "GET /api/health": "Health check",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Voting DApp Backend running on port ${PORT}`);
});