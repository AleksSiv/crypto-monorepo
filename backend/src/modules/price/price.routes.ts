import { FastifyInstance } from "fastify";
import { priceController } from "./price.controller";

export async function priceRoutes(app: FastifyInstance) {
  app.get("/price/:symbol", priceController.getPrice.bind(priceController));
  app.get("/history/:symbol", priceController.getHistory.bind(priceController));
}
