"use client";

import { Line } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

import { WSContext } from "./WSProvider";

ChartJS.register(LineElement, Tooltip, CategoryScale, LinearScale, PointElement);


ChartJS.defaults.animation = false;
ChartJS.defaults.responsive = false;
ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.devicePixelRatio = 1;

export default function PriceChart() {
  const { price } = useContext(WSContext);
  const [labels, setLabels] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    if (!price) return;
    setLabels((prev) => [...prev.slice(-29), new Date().toLocaleTimeString()]);
    setPrices((prev) => [...prev.slice(-29), price]);
  }, [price]);

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Live BTC/USDT Chart</h2>

      
      <div className="relative w-full" style={{ height: "300px" }}>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: "BTC Price",
                data: prices,
                borderColor: "rgb(37, 99, 235)",
                borderWidth: 2,
                pointRadius: 0,
              },
            ],
          }}
          options={{
            animation: false,
            responsive: false,
            maintainAspectRatio: false,
            devicePixelRatio: 1,
            scales: {
              y: { beginAtZero: false },
            },
            plugins: {
              legend: { display: false },
            },
          }}
        />
      </div>
    </div>
  );
}
