import type { CostCategory } from "./constants";

export type Concert = {
  id: string;
  user_id: string;
  artist: string;
  venue: string;
  city: string | null;
  state: string | null;
  concert_date: string;
  fun_rating: number;
  notes: string | null;
  duration_hours: number | null;
  created_at: string;
};

export type ConcertCost = {
  id: string;
  concert_id: string;
  category: CostCategory;
  amount: number;
  description: string | null;
  created_at: string;
};

export type ConcertWithCosts = Concert & {
  concert_costs: ConcertCost[];
};
