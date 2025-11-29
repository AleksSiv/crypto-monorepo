import Fastify from "fastify";
import websocketPlugin from "@fastify/websocket";
import rateLimit from "@fastify/rate-limit";
import { priceRoutes } from "./modules/price/price.routes";
import { errorHandler } from "./core/errors/errorHandler";
import { apiKeyMiddleware } from "./middleware/apiKey";
import { logger } from "./core/utils/logger";

let wsClients: any[] = [];

export async function createServer() {
  const app = Fastify({ logger: false });

  // WebSocket support
  await app.register(websocketPlugin);

  // Rate limit for HTTP
  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  // Public WebSocket route
  app.get("/ws", { websocket: true }, (connection /* SocketStream */, req) => {
    wsClients.push(connection.socket);
    logger.info("WS client connected");

    connection.socket.on("close", () => {
      wsClients = wsClients.filter((c) => c !== connection.socket);
      logger.info("WS client disconnected");
    });
  });

  // Public healthcheck (no API key)
  app.get("/health", async () => ({ status: "ok" }));

  // API key required for HTTP routes (except WS)
  app.addHook("preHandler", apiKeyMiddleware);

  // JSON API
  app.register(priceRoutes, { prefix: "/api" });

  // Error handler
  app.setErrorHandler(errorHandler);

  return { app };
}

// Broadcast to all WS clients
export function broadcastWS(data: any) {
  const payload = JSON.stringify(data);
  wsClients.forEach((ws) => {
    try {
      ws.send(payload);
    } catch (e) {}
  });
}
