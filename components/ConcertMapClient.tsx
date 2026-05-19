"use client";

import dynamic from "next/dynamic";
import type { ConcertWithCosts } from "@/lib/types";

const ConcertMap = dynamic(
  () => import("./ConcertMap").then((mod) => mod.ConcertMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-base-300 bg-base-200/40">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    ),
  }
);

export function ConcertMapClient({ concerts }: { concerts: ConcertWithCosts[] }) {
  return <ConcertMap concerts={concerts} />;
}
