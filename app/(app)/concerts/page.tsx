import { ConcertList } from "@/components/ConcertList";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { createClient } from "@/lib/supabase/server";
import type { ConcertWithCosts } from "@/lib/types";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function ConcertsPage() {
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
          title="My concerts"
          subtitle="View, edit, or delete shows you've logged."
          action={
            <Link href="/concerts/new" className="btn btn-primary gap-2">
              <PlusCircle className="h-4 w-4" aria-hidden />
              Add concert
            </Link>
          }
        />
        <ConcertList concerts={concerts} />
      </div>
    </PageContainer>
  );
}
