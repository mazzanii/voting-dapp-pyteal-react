import algosdk from "algosdk";

// Algorand TestNet configuration via public API
// For localnet development: http://localhost:4001
const algodToken = "";
const server = "https://testnet-api.algonode.cloud";
const port = "";

export function getClient(): algosdk.Algodv2 {
  return new algosdk.Algodv2(algodToken, server, port);
}

// The App ID of the deployed voting smart contract
// Replace with your actual deployed app ID from the original DApp
export const VOTING_APP_ID = 0; // UPDATE THIS after deploying the contract
