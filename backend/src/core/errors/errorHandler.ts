import { ApiError } from "./ApiError";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export function errorHandler(
  error: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof ApiError) {
    reply.status(error.status).send({
      error: error.name,
      status: error.status,
      message: error.message
    });
    return;
  }

  reply.status(500).send({
    error: "ServerError",
    status: 500,
    message: error.message || "Internal server error"
  });
}
