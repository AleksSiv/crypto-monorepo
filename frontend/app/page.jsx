import WSProvider from "../components/WSProvider";
import PriceCard from "../components/PriceCard";
import PriceChart from "../components/PriceChart";

export default function Home() {
  return (
    <WSProvider>
      <main className="max-w-3xl mx-auto py-10 px-4 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-6">Crypto Dashboard</h1>
        <PriceCard />
        <PriceChart />
      </main>
    </WSProvider>
  );
}
