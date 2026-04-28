const candidates = [
  {
    id: "candidateA",
    name: "Candidate A",
    party: "Progress Party",
    manifesto: "Focus on blockchain transparency and digital governance",
  },
  {
    id: "candidateB",
    name: "Candidate B",
    party: "Innovation Alliance",
    manifesto: "Decentralized public services and smart contract automation",
  },
];

const electionRules = {
  registrationRequired: true,
  doubleVotingPrevented: true,
  votingMethod: "Algorand NoOp application call",
  resultsStorage: "On-chain global state",
  networkFee: "0.001 Algo per transaction",
  network: "Algorand TestNet",
};

export const getCandidateInfo = () => {
  return candidates;
};

export const getCandidateById = (id: string) => {
  return candidates.find((c) => c.id === id.toLowerCase()) || null;
};

export const getElectionRules = () => {
  return electionRules;
};