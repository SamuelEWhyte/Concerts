"use client";

import type { ConcertWithCosts } from "@/lib/types";
import {
  concertTotal,
  formatCurrency,
  formatDate,
} from "@/lib/dashboard";
import { CATEGORY_LABELS, type CostCategory } from "@/lib/constants";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { EmptyConcerts } from "./EmptyConcerts";
import { StarRating } from "./StarRating";
import { ConcertCardActions } from "./ConcertCardActions";

export function ConcertList({ concerts }: { concerts: ConcertWithCosts[] }) {
  const [parent] = useAutoAnimate();

  if (concerts.length === 0) {
    return <EmptyConcerts />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Your concerts</h2>
      <div ref={parent} className="grid gap-4 md:grid-cols-2">
        {concerts.map((concert) => (
          <ConcertCard key={concert.id} concert={concert} />
        ))}
      </div>
    </div>
  );
}

function ConcertCard({ concert }: { concert: ConcertWithCosts }) {
  const total = concertTotal(concert);
  const topCategory = getTopCategory(concert);

  return (
    <article className="app-card-interactive">
      <div className="card-body gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-bold">{concert.artist}</h3>
            <p className="text-sm text-base-content/70">{concert.venue}</p>
            <p className="mt-0.5 text-sm text-base-content/60">
              {formatDate(concert.concert_date)}
              {concert.city && concert.state && (
                <span className="block">
                  {concert.city}, {concert.state}
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="badge badge-primary badge-lg font-semibold">
              {formatCurrency(total)}
            </span>
            <StarRating rating={concert.fun_rating} />
          </div>
        </div>

        {topCategory && (
          <div className="flex flex-wrap gap-1">
            <span className="badge badge-outline badge-sm">
              Top spend: {CATEGORY_LABELS[topCategory]}
            </span>
          </div>
        )}

        {concert.notes && (
          <p className="text-sm italic text-base-content/80">{concert.notes}</p>
        )}

        <ul className="space-y-1.5 border-t border-base-300 pt-3 text-sm">
          {concert.concert_costs.map((cost) => (
            <li key={cost.id} className="flex justify-between gap-2">
              <span className="text-base-content/80">
                {CATEGORY_LABELS[cost.category as CostCategory]}
                {cost.description ? ` — ${cost.description}` : ""}
              </span>
              <span className="shrink-0 font-medium">
                {formatCurrency(Number(cost.amount))}
              </span>
            </li>
          ))}
        </ul>

        <ConcertCardActions concertId={concert.id} />
      </div>
    </article>
  );
}

function getTopCategory(concert: ConcertWithCosts): CostCategory | null {
  if (concert.concert_costs.length === 0) return null;
  const totals = new Map<CostCategory, number>();
  for (const cost of concert.concert_costs) {
    const cat = cost.category as CostCategory;
    totals.set(cat, (totals.get(cat) ?? 0) + Number(cost.amount));
  }
  let top: CostCategory | null = null;
  let max = 0;
  for (const [cat, amount] of totals) {
    if (amount > max) {
      max = amount;
      top = cat;
    }
  }
  return top;
}
