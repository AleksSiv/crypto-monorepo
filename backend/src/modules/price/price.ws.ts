import WebSocket from "ws";
import { redis } from "../../redis/redisClient";
import { logger } from "../../core/utils/logger";

type BroadcastFn = (payload: any) => void;

/**
 * Connects to Binance WebSocket streams and updates Redis + broadcasts to frontend clients.
 */
export function startPriceFeed(symbols: string[], broadcast: (data: any) => void) {
  symbols.forEach((symbol) => {
    const stream = symbol.toLowerCase() + "@ticker";
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${stream}`);

    ws.on("open", () => logger.info(`Connected to Binance WS (${symbol})`));

      ws.on("message", async (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      const price = Number(data.c);
      const ts = Date.now();

      const obj = { symbol, price, timestamp: ts };
      broadcast(obj);
    } catch (e) {
      logger.error({ error: e }, "WS Binance msg error");
    }
  });


    ws.on("close", () => logger.info(`Binance WS closed (${symbol})`));
  });
}
