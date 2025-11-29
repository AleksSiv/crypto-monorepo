import { redis } from "../../redis/redisClient";
import { ApiError } from "../../core/errors/ApiError";

class PriceService {
  async getPrice(symbol: string) {
    const data = await redis.get(`price:${symbol}:latest`);
    if (!data) throw ApiError.badRequest("Symbol not found");
    return JSON.parse(data);
  }

  async getHistory(symbol: string, limit: number) {
    const arr = await redis.lrange(`history:${symbol}`, 0, limit - 1);
    return arr.map((item) => JSON.parse(item));
  }
}

export const priceService = new PriceService();
