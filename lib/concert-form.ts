import { COST_CATEGORIES, type CostCategory } from "./constants";

export type ConcertFormState = {
  error?: string;
};

export type ParsedConcertForm = {
  artist: string;
  venue: string;
  city: string;
  state: string;
  concertDate: string;
  funRating: number;
  notes: string | null;
  durationHours: number | null;
  costs: {
    category: CostCategory;
    amount: number;
    description: string | null;
  }[];
};

const validCategories = new Set(COST_CATEGORIES.map((c) => c.value));

const US_STATE_CODES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC",
]);

export function parseConcertForm(
  formData: FormData
): { error: string } | ParsedConcertForm {
  const artist = String(formData.get("artist") ?? "").trim();
  const venue = String(formData.get("venue") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim().toUpperCase();
  const concertDate = String(formData.get("concert_date") ?? "").trim();
  const funRating = Number(formData.get("fun_rating"));
  const notes = String(formData.get("notes") ?? "").trim() || null;
  const durationRaw = String(formData.get("duration_hours") ?? "").trim();
  const durationHours = durationRaw ? parseFloat(durationRaw) : null;

  if (!artist || !venue || !city || !state || !concertDate) {
    return { error: "Please fill in artist, venue, city, state, and date." };
  }

  if (!US_STATE_CODES.has(state)) {
    return { error: "Please use a valid 2-letter US state code (e.g. NY, CA)." };
  }

  if (!funRating || funRating < 1 || funRating > 5) {
    return { error: "Please choose how fun the concert was (1 to 5 stars)." };
  }

  if (durationHours !== null && (Number.isNaN(durationHours) || durationHours < 0)) {
    return { error: "Duration must be zero or more hours, or leave it blank." };
  }

  const categories = formData.getAll("cost_category").map(String);
  const amounts = formData.getAll("cost_amount").map(String);
  const descriptions = formData.getAll("cost_description").map(String);

  if (categories.length === 0) {
    return { error: "Please add at least one cost (for example, a ticket)." };
  }

  const costs: ParsedConcertForm["costs"] = [];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i] as CostCategory;
    const amount = parseFloat(amounts[i] ?? "");
    const description = descriptions[i]?.trim() || null;

    if (!validCategories.has(category)) {
      return { error: "One of the cost categories is not valid." };
    }
    if (Number.isNaN(amount) || amount < 0) {
      return { error: "Each cost needs a valid amount of zero or more." };
    }

    costs.push({ category, amount, description });
  }

  return {
    artist,
    venue,
    city,
    state,
    concertDate,
    funRating,
    notes,
    durationHours,
    costs,
  };
}
