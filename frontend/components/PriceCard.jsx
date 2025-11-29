"use client";

import { useContext } from "react";
import { WSContext } from "./WSProvider";

export default function PriceCard() {
  const { price, lastUpdate } = useContext(WSContext);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-2">BTC/USDT Price</h2>
      <div className="text-4xl font-bold text-blue-600">
        {price ? price.toFixed(2) : "Loading..."}
      </div>
      <p className="text-gray-500 text-sm mt-2">
        {lastUpdate ? `Last update: ${lastUpdate.toLocaleTimeString()}` : "Waiting for live data..."}
      </p>
    </div>
  );
}
