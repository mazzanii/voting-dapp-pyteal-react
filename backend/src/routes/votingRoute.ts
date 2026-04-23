import { Router, Request, Response } from "express";
import {
  getElectionResults,
  verifyTransaction,
  getCandidates,
} from "../services/votingService";
import { VOTING_APP_ID } from "../config/config";

const votingRoute = Router();

// GET /api/voting/results - Get current election results from blockchain
votingRoute.get("/results", async (_req: Request, res: Response) => {
  try {
    const results = await getElectionResults();
    res.json(results);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: msg });
  }
});

// GET /api/voting/results/:appId - Get results for a specific app
votingRoute.get("/results/:appId", async (req: Request, res: Response) => {
  try {
    const appId = parseInt(req.params.appId, 10);
    if (isNaN(appId)) {
      res.status(400).json({ error: "Invalid app ID" });
      return;
    }
    const results = await getElectionResults(appId);
    res.json(results);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: msg });
  }
});

// GET /api/voting/candidates - Get list of candidates
votingRoute.get("/candidates", async (_req: Request, res: Response) => {
  try {
    const candidates = await getCandidates();
    res.json({ appId: VOTING_APP_ID, candidates });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: msg });
  }
});

// GET /api/voting/verify/:txId - Verify a vote transaction
votingRoute.get("/verify/:txId", async (req: Request, res: Response) => {
  try {
    const { txId } = req.params;
    const txInfo = await verifyTransaction(txId);
    res.json({ txId, verified: true, details: txInfo });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    res.status(404).json({ txId: req.params.txId, verified: false, error: msg });
  }
});

export default votingRoute;
