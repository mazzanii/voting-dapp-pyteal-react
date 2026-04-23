# Voting DApp Backend Enhancement

Express/TypeScript backend API added to the [gconnect/voting-dapp-pyteal-react](https://github.com/gconnect/voting-dapp-pyteal-react) OSS project as part of the CN6035 coursework.

## What this adds

The original DApp has no dedicated backend — all blockchain calls happen directly from the React client. This enhancement adds:

- **Express API server** (Node.js + TypeScript) — Week 3 pattern
- **Service layer architecture** — separating voting and weather services from route controllers
- **API Gateway pattern** — single entry point routing to multiple services (Week 4)
- **Weather context API** — additional data service demonstrating microservices integration
- **CORS enabled** — for frontend-backend communication (Weeks 5-6)
- **OpenAPI 3.0 spec** — documented on SwaggerHub
- **ESLint + Prettier** — code quality tooling
- **TypeScript strict mode** — compile-time type safety

## Setup

```bash
cd backend
npm install
npm run build
npm run start   # runs on port 4000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/voting/results` | Read election results from blockchain |
| GET | `/api/voting/results/:appId` | Results for a specific app |
| GET | `/api/voting/candidates` | List candidates |
| GET | `/api/voting/verify/:txId` | Verify a vote transaction |
| GET | `/api/weather/:city` | Weather data |
| GET | `/api/weather` | Supported cities |
| GET | `/api/health` | Health check |

## Configuration

Update `src/config/config.ts` with your deployed voting app ID:

```typescript
export const VOTING_APP_ID = 12345; // your app ID
```

## Technologies

- Node.js + Express + TypeScript
- Algorand JS SDK (algosdk)
- ESLint + Prettier
- OpenAPI 3.0
