import { FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "../core/errors/ApiError";

export function apiKeyMiddleware(
  req: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  // Do not require API key for WebSocket upgrades or healthcheck
  if (req.raw.url?.startsWith("/ws") || req.raw.url === "/health") {
    return done();
  }

  const key = req.headers["x-api-key"];
  if (!key || key !== process.env.API_KEY) {
    throw ApiError.unauthorized("Invalid API key");
  }
  done();
}
