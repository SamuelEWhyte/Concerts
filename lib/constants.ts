export const COST_CATEGORIES = [
  { value: "ticket", label: "Ticket" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "merch", label: "Merch" },
  { value: "other", label: "Other" },
] as const;

export type CostCategory = (typeof COST_CATEGORIES)[number]["value"];

export const THEMES = ["light", "dark", "cupcake", "synthwave"] as const;

export type Theme = (typeof THEMES)[number];

export const CATEGORY_LABELS: Record<CostCategory, string> = {
  ticket: "Ticket",
  travel: "Travel",
  food: "Food",
  merch: "Merch",
  other: "Other",
};
