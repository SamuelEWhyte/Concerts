import type { ConcertWithCosts } from "./types";
import { CATEGORY_LABELS, type CostCategory } from "./constants";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function concertTotal(concert: ConcertWithCosts) {
  const costs = concert.concert_costs ?? [];
  return costs.reduce((sum, c) => sum + Number(c.amount), 0);
}

export function computeStats(concerts: ConcertWithCosts[]) {
  const allCosts = concerts.flatMap((c) => c.concert_costs ?? []);
  const totalSpend = allCosts.reduce((sum, c) => sum + Number(c.amount), 0);
  const concertCount = concerts.length;
  const avgFun =
    concertCount === 0
      ? 0
      : concerts.reduce((sum, c) => sum + c.fun_rating, 0) / concertCount;
  const avgCostPerConcert =
    concertCount === 0 ? 0 : totalSpend / concertCount;

  return { totalSpend, concertCount, avgFun, avgCostPerConcert };
}

export function spendByCategory(concerts: ConcertWithCosts[]) {
  const map = new Map<CostCategory, number>();
  for (const concert of concerts) {
    for (const cost of concert.concert_costs ?? []) {
      const cat = cost.category as CostCategory;
      map.set(cat, (map.get(cat) ?? 0) + Number(cost.amount));
    }
  }
  return Array.from(map.entries()).map(([category, value]) => ({
    name: CATEGORY_LABELS[category],
    value,
  }));
}

export function funRatingDistribution(concerts: ConcertWithCosts[]) {
  const counts = [1, 2, 3, 4, 5].map((rating) => ({
    rating: `${rating}★`,
    count: concerts.filter((c) => c.fun_rating === rating).length,
  }));
  return counts;
}

export function spendByMonth(concerts: ConcertWithCosts[]) {
  const map = new Map<string, number>();
  for (const concert of concerts) {
    const d = new Date(concert.concert_date + "T12:00:00");
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const total = concertTotal(concert);
    map.set(key, (map.get(key) ?? 0) + total);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, total]) => {
      const [year, month] = key.split("-");
      const label = new Date(
        Number(year),
        Number(month) - 1,
        1
      ).toLocaleDateString("en-US", { month: "short", year: "numeric" });
      return { month: label, total };
    });
}
