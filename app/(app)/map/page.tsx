import { ConcertMapClient } from "@/components/ConcertMapClient";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { createClient } from "@/lib/supabase/server";
import type { ConcertWithCosts } from "@/lib/types";

export default async function MapPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("concerts")
    .select("*, concert_costs(*)")
    .order("concert_date", { ascending: false });

  if (error) {
    console.error(error);
  }

  const concerts = (data ?? []) as ConcertWithCosts[];

  return (
    <PageContainer>
      <div className="page-section">
        <PageHeader
          title="Map view"
          subtitle="See where you've been to shows across the US."
        />
        {concerts.length === 0 ? (
          <p className="text-base-content/70">
            Add a concert with city and state to see pins on the map.
          </p>
        ) : (
          <ConcertMapClient concerts={concerts} />
        )}
      </div>
    </PageContainer>
  );
}
