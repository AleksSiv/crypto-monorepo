# Crypto Monorepo

A full-stack real-time crypto dashboard built with a Node.js backend, a Next.js frontend, and Docker-based deployment.  
This project demonstrates clean architecture, WebSocket streaming, API design, React state management, and containerized development.

The system connects to the Binance WebSocket feed, aggregates live price data, broadcasts updates to clients, and displays dynamic charts in the user interface.

---

## Overview

This repository contains two applications:

1. Backend (Node.js + Fastify)
   - REST API with API key authentication
   - WebSocket server for broadcasting real-time price updates
   - Binance WebSocket integration
   - Structured logging
   - Docker-ready
   - Clean modular architecture

2. Frontend (Next.js + React)
   - Real-time UI updates via WebSocket context provider
   - Live BTC price card
   - Live price chart
   - Tailwind-based clean layout
   - Fully isolated from backend logic
   - Optimized for developer readability

The entire environment runs under Docker Compose.

---

## Features

- Live price updates streamed from Binance
- Real-time broadcasting to all frontend clients
- Stateless backend architecture
- Clean separation of backend and frontend
- Production-ready Docker configuration
- Local development and build reproducibility
- Readable and well-structured codebase

---

## Technology Stack

**Backend**
- Node.js
- Fastify
- WebSocket
- Binance streaming API
- Pino (logging)
- Docker

**Frontend**
- Next.js (App Router)
- React
- WebSocket context provider
- Chart.js
- Tailwind CSS

**Infrastructure**
- Docker Compose
- Redis (optional placeholder container)

---

## Local Development (without Docker)

### Backend
cd backend
npm install
npm run dev

yaml
Copy code

Backend runs at:
http://localhost:4000
ws://localhost:4000/ws

shell
Copy code

### Frontend
cd frontend
npm install
npm run dev

yaml
Copy code

Frontend runs at:
http://localhost:3000

yaml
Copy code

---

## Running with Docker (recommended)

From the project root:

docker compose up -d --build

yaml
Copy code

Services:

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Backend WS: ws://localhost:4000/ws

To view logs:

docker logs crypto-backend
docker logs crypto-frontend

vbnet
Copy code

To stop environment:

docker compose down

yaml
Copy code

---

## Project Structure

crypto-monorepo/
│
├── backend/
│ ├── src/
│ ├── package.json
│ ├── Dockerfile
│ └── README.md (optional)
│
├── frontend/
│ ├── app/
│ ├── components/
│ ├── package.json
│ ├── next.config.mjs
│ └── Dockerfile
│
├── docker-compose.yml
└── README.md

yaml
Copy code

---

## API Summary

### Health check
GET /health

shell
Copy code

### Live price stream
WS /ws

css
Copy code

Each message includes:

```json
{
  "symbol": "BTCUSDT",
  "price": 43214.52,
  "timestamp": 1732718240000
}
Notes on Architecture
Backend follows a modular structure to isolate domain logic, routes, WebSocket events, and error handling.

Frontend uses a dedicated WebSocket provider that updates components without unnecessary re-renders.

Chart rendering is isolated to prevent layout expansion and React Strict Mode double-render issues.

The monorepo format keeps services independent but easy to manage together.

License
This project is provided for demonstration and educational purposes.
You are free to clone, modify, or extend it.