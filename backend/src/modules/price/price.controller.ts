import { FastifyReply, FastifyRequest } from "fastify";
import { priceService } from "./price.service";
import { validateSymbol } from "../../core/utils/validateSymbol";
import { ApiError } from "../../core/errors/ApiError";

class PriceController {
  async getPrice(req: FastifyRequest, reply: FastifyReply) {
    const symbol = (req.params as any).symbol.toUpperCase();
    if (!validateSymbol(symbol)) throw ApiError.badRequest("Unknown symbol");
    const result = await priceService.getPrice(symbol);
    reply.send({ symbol, ...result });
  }

  async getHistory(req: FastifyRequest, reply: FastifyReply) {
    const symbol = (req.params as any).symbol.toUpperCase();
    const limit = Number((req.query as any).limit || 50);
    if (!validateSymbol(symbol)) throw ApiError.badRequest("Unknown symbol");
    const data = await priceService.getHistory(symbol, limit);
    reply.send({ symbol, limit, data });
  }
}

export const priceController = new PriceController();
