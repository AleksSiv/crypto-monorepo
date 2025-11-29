"use client";

import { createContext, useEffect, useState } from "react";

export const WSContext = createContext({ price: null, lastUpdate: null });

export default function WSProvider({ children }) {
  const [price, setPrice] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000/ws");

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (data.symbol === "BTCUSDT") {
          setPrice(data.price);
          setLastUpdate(new Date(data.timestamp));
        }
      } catch (e) {
        console.error("WS parse error", e);
      }
    };

    ws.onclose = () => {
      console.log("WS closed");
    };

    return () => ws.close();
  }, []);

  return (
    <WSContext.Provider value={{ price, lastUpdate }}>
      {children}
    </WSContext.Provider>
  );
}
