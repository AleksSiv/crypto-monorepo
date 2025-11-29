import dotenv from "dotenv";
import { createServer, broadcastWS } from "./serverApp";
import { logger } from "./core/utils/logger";
import { startPriceFeed } from "./modules/price/price.ws";

dotenv.config();

async function bootstrap() {
  const { app } = await createServer();
  const port = Number(process.env.PORT) || 4000;

  // Start Binance price feed and broadcast to WS
  const symbols = (process.env.SYMBOLS || "").split(",");
  startPriceFeed(symbols, broadcastWS);

  try {
    await app.listen({ port, host: "0.0.0.0" });
    logger.info(`Backend listening on port ${port}`);
  } catch (err) {
    logger.error(err);
  }
}

bootstrap();
