import { ConcertForm } from "@/components/ConcertForm";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { createClient } from "@/lib/supabase/server";
import type { ConcertWithCosts } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function EditConcertPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("concerts")
    .select("*, concert_costs(*)")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const concert = data as ConcertWithCosts;

  return (
    <PageContainer>
      <div className="page-section">
        <PageHeader
          title="Edit concert"
          subtitle={`${concert.artist} at ${concert.venue}`}
        />
        <ConcertForm mode="edit" concert={concert} />
      </div>
    </PageContainer>
  );
}
