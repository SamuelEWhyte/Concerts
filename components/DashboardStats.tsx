import { DollarSign, Music, Receipt, Star } from "lucide-react";
import { StatCard } from "./StatCard";
import { formatCurrency } from "@/lib/dashboard";

type DashboardStatsProps = {
  totalSpend: number;
  concertCount: number;
  avgFun: number;
  avgCostPerConcert: number;
};

export function DashboardStats({
  totalSpend,
  concertCount,
  avgFun,
  avgCostPerConcert,
}: DashboardStatsProps) {
  return (
    <div className="app-card">
      <div className="card-body p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          <StatCard
            label="Total spent"
            value={formatCurrency(totalSpend)}
            icon={DollarSign}
            valueClassName="text-primary"
          />
          <StatCard
            label="Concerts"
            value={String(concertCount)}
            icon={Music}
          />
          <StatCard
            label="Avg fun rating"
            value={concertCount === 0 ? "—" : avgFun.toFixed(1)}
            hint="out of 5 stars"
            icon={Star}
          />
          <StatCard
            label="Avg cost / concert"
            value={formatCurrency(avgCostPerConcert)}
            icon={Receipt}
            valueClassName="text-secondary"
          />
        </div>
      </div>
    </div>
  );
}
