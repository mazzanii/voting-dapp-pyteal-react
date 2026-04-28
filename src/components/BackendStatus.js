import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
`;

const StatusTitle = styled.h3`
  color: #0369a1;
  margin-bottom: 10px;
`;

const StatusText = styled.p`
  color: #475569;
  font-size: 14px;
  margin: 5px 0;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  text-align: left;
`;

const RulesCard = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  border: 1px solid #e2e8f0;
  text-align: left;
`;

const FetchButton = styled.button`
  padding: 8px 20px;
  background: #0284c7;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  margin: 10px 5px;
  &:hover { background: #0369a1; }
`;

const BACKEND_URL = "http://localhost:4000/api";

function BackendStatus() {
  const [health, setHealth] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const [rules, setRules] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/health`)
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(() => setError("Backend not running on port 4000"));
  }, []);

  const fetchCandidates = () => {
    setError("");
    fetch(`${BACKEND_URL}/election/candidates`)
      .then(res => res.json())
      .then(data => setCandidates(data.candidates))
      .catch(() => setError("Failed to fetch candidates"));
  };

  const fetchRules = () => {
    setError("");
    fetch(`${BACKEND_URL}/election/rules`)
      .then(res => res.json())
      .then(data => setRules(data))
      .catch(() => setError("Failed to fetch rules"));
  };

  return (
    <StatusContainer>
      <StatusTitle>Backend API Status (Frontend Enhancement)</StatusTitle>

      {error && <StatusText style={{color: '#dc2626'}}>{error}</StatusText>}

      {health && (
        <StatusText>
          Server: {health.status === "ok" ? " Running" : " Down"} | 
          Version: {health.version} | 
          Time: {new Date(health.timestamp).toLocaleTimeString()}
        </StatusText>
      )}

      <div>
        <FetchButton onClick={fetchCandidates}>View Candidates</FetchButton>
        <FetchButton onClick={fetchRules}>Voting Rules</FetchButton>
      </div>

      {candidates && candidates.map(c => (
        <Card key={c.id}>
          <StatusText style={{fontWeight: 'bold', color: '#0369a1', fontSize: '16px'}}>{c.name}</StatusText>
          <StatusText>Party: {c.party}</StatusText>
          <StatusText>Manifesto: {c.manifesto}</StatusText>
        </Card>
      ))}

      {rules && (
        <RulesCard>
          <StatusText style={{fontWeight: 'bold', color: '#0369a1'}}>Election Rules</StatusText>
          <StatusText>Registration required: {rules.registrationRequired ? "Yes" : "No"}</StatusText>
          <StatusText>Double voting prevented: {rules.doubleVotingPrevented ? "Yes (on-chain)" : "No"}</StatusText>
          <StatusText>Voting method: {rules.votingMethod}</StatusText>
          <StatusText>Results storage: {rules.resultsStorage}</StatusText>
          <StatusText>Network fee: {rules.networkFee}</StatusText>
          <StatusText>Network: {rules.network}</StatusText>
        </RulesCard>
      )}
    </StatusContainer>
  );
}

export default BackendStatus;