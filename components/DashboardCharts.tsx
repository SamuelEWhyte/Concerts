"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/dashboard";
import { BarChart3 } from "lucide-react";

const PIE_COLORS = ["#6366f1", "#8b5cf6", "#f59e0b", "#14b8a6", "#ec4899"];

type ChartProps = {
  categoryData: { name: string; value: number }[];
  funData: { rating: string; count: number }[];
  monthData: { month: string; total: number }[];
};

export function DashboardCharts({
  categoryData,
  funData,
  monthData,
}: ChartProps) {
  const hasData =
    categoryData.length > 0 ||
    funData.some((d) => d.count > 0) ||
    monthData.length > 0;

  if (!hasData) {
    return (
      <div className="app-card flex min-h-[200px] flex-col items-center justify-center p-8 text-center">
        <BarChart3 className="mb-3 h-10 w-10 text-base-content/30" aria-hidden />
        <p className="text-base-content/60">
          Charts will appear after you add concerts with costs.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {categoryData.length > 0 && (
        <div className="app-card lg:col-span-1">
          <div className="card-body min-h-[280px]">
            <h3 className="mb-2 font-semibold">Spending by category</h3>
            <div className="h-56 w-full flex-1 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={PIE_COLORS[i % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="app-card lg:col-span-1">
        <div className="card-body min-h-[280px]">
          <h3 className="mb-2 font-semibold">Fun rating breakdown</h3>
          <div className="h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="rating" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  name="Concerts"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {monthData.length > 0 && (
        <div className="app-card lg:col-span-2 xl:col-span-1">
          <div className="card-body min-h-[280px]">
            <h3 className="mb-2 font-semibold">Spending by month</h3>
            <div className="h-56 w-full sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => `$${v}`} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#6366f1"
                    strokeWidth={2}
                    name="Total spend"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
