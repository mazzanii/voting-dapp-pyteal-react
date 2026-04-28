import { Router, Request, Response } from "express";
import {
  getCandidateInfo,
  getCandidateById,
  getElectionRules,
} from "../services/electionInfoService";

const electionRoute = Router();

electionRoute.get("/candidates", (_req: Request, res: Response) => {
  res.json({ candidates: getCandidateInfo() });
});

electionRoute.get("/candidates/:id", (req: Request, res: Response) => {
  const candidate = getCandidateById(req.params.id);
  if (!candidate) {
    res.status(404).json({ error: "Candidate not found" });
    return;
  }
  res.json(candidate);
});

electionRoute.get("/rules", (_req: Request, res: Response) => {
  res.json(getElectionRules());
});

export default electionRoute;
