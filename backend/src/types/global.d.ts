interface VoteRequest {
  candidateId: string;
  voterAddress: string;
  appId: number;
}

interface VoteResult {
  candidateId: string;
  txId: string;
  timestamp: string;
  confirmed: boolean;
}

interface CandidateResult {
  name: string;
  votes: number;
}

interface ElectionStatus {
  appId: number;
  candidates: CandidateResult[];
  totalVotes: number;
  registrationOpen: boolean;
  votingOpen: boolean;
}

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  condition: string;
}
