# Crypto Monorepo

A full-stack real-time crypto dashboard built with a Node.js backend, a Next.js frontend, and Docker-based deployment.

The system connects to the Binance WebSocket stream, receives live BTC/USDT price data, forwards it through a dedicated backend WebSocket server, and visualizes it on a responsive web dashboard.

This repository is designed as a clean, professional demonstration of full-stack development, real-time data handling, WebSocket architecture, and containerized deployment.

---

## Overview

This monorepo contains two independent applications:

### Backend (Node.js + Fastify)
- Real-time data ingestion from Binance WebSocket API  
- Internal WebSocket server for broadcasting updates  
- REST health endpoint  
- Structured logging with Pino  
- Docker-ready and portable  
- Clean module separation  

### Frontend (Next.js + React)
- Real-time UI updates via a WebSocket provider  
- Live BTC price card  
- Live chart based on Chart.js  
- Tailwind CSS layout  
- Lightweight, clear, and readable structure  
- No SSR for charts to avoid rendering issues  

### Infrastructure
- Docker Compose orchestration  
- Optional Redis service  
- Production-like local environment  

---

## Technology Stack

### Backend
- Node.js  
- Fastify  
- WebSocket  
- Binance streaming API  
- Pino logger  

### Frontend
- Next.js (App Router)  
- React  
- WebSocket context provider  
- Chart.js  
- Tailwind CSS  

### Infrastructure
- Docker  
- Docker Compose  

---

## Project Structure

```
crypto-monorepo/
│
├── backend/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── package.json
│   ├── next.config.mjs
│   ├── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## Local Development (without Docker)

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

- http://localhost:4000
- ws://localhost:4000/ws

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

- http://localhost:3000

---

## Running with Docker

From the project root:

```bash
docker compose up -d --build
```

Services will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Backend WebSocket: ws://localhost:4000/ws

To view logs:

```bash
docker logs crypto-backend
docker logs crypto-frontend
```

To stop all services:

```bash
docker compose down
```

---

## API Summary

### Health Check  
```
GET /health
```

### WebSocket Endpoint  
```
WS /ws
```

Each update contains:

```json
{
  "symbol": "BTCUSDT",
  "price": 43214.52,
  "timestamp": 1732718240000
}
```

---

## Notes on Architecture

- The backend is intentionally stateless and does not store data.  
- Binance data is streamed in real time and forwarded directly to connected clients.  
- WebSocket broadcasting keeps the frontend synchronized without polling.  
- The frontend uses a simple WebSocket provider for state updates.  
- Chart rendering is isolated to avoid double-render issues in React.  
- Docker ensures reproducible builds for both applications.

---

## License

This project is provided for demonstration and educational purposes.  
You are free to clone, modify, or extend it.

