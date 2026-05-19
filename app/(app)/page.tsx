import { DashboardCharts } from "@/components/DashboardCharts";
import { BadgeGrid } from "@/components/BadgeGrid";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { DashboardStats } from "@/components/DashboardStats";
import { AlertBanner } from "@/components/AlertBanner";
import { createClient } from "@/lib/supabase/server";
import {
  computeStats,
  funRatingDistribution,
  spendByCategory,
  spendByMonth,
} from "@/lib/dashboard";
import type { ConcertWithCosts } from "@/lib/types";

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value;
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
    error?: string;
    error_description?: string;
  }>;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("concerts")
    .select("*, concert_costs(*)")
    .order("concert_date", { ascending: false });

  if (error) {
    console.error(error);
  }

  const concerts = (data ?? []) as ConcertWithCosts[];
  const stats = computeStats(concerts);
  const params = await searchParams;

  return (
    <PageContainer>
      <div className="page-section">
        <PageHeader
          title="Dashboard"
          subtitle="Your concert spending and fun ratings at a glance."
        />

        {params.error_description && (
          <AlertBanner
            variant="warning"
            message={`${safeDecode(params.error_description)}. You can still use the app below.`}
          />
        )}

        <DashboardStats
          totalSpend={stats.totalSpend}
          concertCount={stats.concertCount}
          avgFun={stats.avgFun}
          avgCostPerConcert={stats.avgCostPerConcert}
        />

        <section>
          <h2 className="mb-4 text-xl font-semibold tracking-tight">Charts</h2>
          <DashboardCharts
            categoryData={spendByCategory(concerts)}
            funData={funRatingDistribution(concerts)}
            monthData={spendByMonth(concerts)}
          />
        </section>

        <BadgeGrid concerts={concerts} />
      </div>
    </PageContainer>
  );
}
