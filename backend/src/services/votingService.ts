import { getClient, VOTING_APP_ID } from "../config/config";

/**
 * Reads the global state of the voting smart contract
 * from the Algorand blockchain and returns election results.
 */
export const getElectionResults = async (
  appId: number = VOTING_APP_ID
): Promise<ElectionStatus> => {
  const client = getClient();

  try {
    const appInfo = await client.getApplicationByID(appId).do();
    const globalState = appInfo.params["global-state"] || [];

    const candidates: CandidateResult[] = [];
    let registrationOpen = false;
    let votingOpen = false;
    let totalVotes = 0;

    for (const state of globalState) {
      // Decode the key from base64
      const key = Buffer.from(state.key, "base64").toString();

      if (key.startsWith("candidate") || key.startsWith("Choice")) {
        const votes = state.value.uint || 0;
        candidates.push({ name: key, votes });
        totalVotes += votes;
      }

      if (key === "RegistrationBegin" || key === "RegistrationEnd") {
        // Check if registration period is active
        const timestamp = state.value.uint || 0;
        const now = Math.floor(Date.now() / 1000);
        if (key === "RegistrationEnd" && timestamp > now) {
          registrationOpen = true;
        }
      }

      if (key === "VotingBegin" || key === "VotingEnd") {
        const timestamp = state.value.uint || 0;
        const now = Math.floor(Date.now() / 1000);
        if (key === "VotingEnd" && timestamp > now) {
          votingOpen = true;
        }
      }
    }

    return {
      appId,
      candidates,
      totalVotes,
      registrationOpen,
      votingOpen,
    };
  } catch (error) {
    console.error("Failed to read election results:", error);
    throw error;
  }
};

/**
 * Verifies a transaction on the Algorand blockchain
 */
export const verifyTransaction = async (
  txId: string
): Promise<Record<string, unknown>> => {
  const client = getClient();
  try {
    const txInfo = await client.pendingTransactionInformation(txId).do();
    return txInfo as Record<string, unknown>;
  } catch (error) {
    console.error("Failed to verify transaction:", error);
    throw error;
  }
};

/**
 * Returns the list of candidate names configured in the smart contract
 */
export const getCandidates = async (
  appId: number = VOTING_APP_ID
): Promise<string[]> => {
  const results = await getElectionResults(appId);
  return results.candidates.map((c) => c.name);
};
