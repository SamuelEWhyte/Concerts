"use server";

import { createClient } from "@/lib/supabase/server";
import { COST_CATEGORIES, type CostCategory } from "@/lib/constants";
import { redirect } from "next/navigation";

export type ConcertFormState = {
  error?: string;
};

const validCategories = new Set(
  COST_CATEGORIES.map((c) => c.value)
);

export async function createConcert(
  _prevState: ConcertFormState,
  formData: FormData
): Promise<ConcertFormState> {
  const artist = String(formData.get("artist") ?? "").trim();
  const venue = String(formData.get("venue") ?? "").trim();
  const concertDate = String(formData.get("concert_date") ?? "").trim();
  const funRating = Number(formData.get("fun_rating"));
  const notes = String(formData.get("notes") ?? "").trim() || null;

  if (!artist || !venue || !concertDate) {
    return { error: "Please fill in the artist, venue, and date." };
  }

  if (!funRating || funRating < 1 || funRating > 5) {
    return { error: "Please choose how fun the concert was (1 to 5 stars)." };
  }

  const categories = formData.getAll("cost_category").map(String);
  const amounts = formData.getAll("cost_amount").map(String);
  const descriptions = formData.getAll("cost_description").map(String);

  if (categories.length === 0) {
    return { error: "Please add at least one cost (for example, a ticket)." };
  }

  const costs: {
    category: CostCategory;
    amount: number;
    description: string | null;
  }[] = [];

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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You need to be logged in to save a concert." };
  }

  const { data: concert, error: concertError } = await supabase
    .from("concerts")
    .insert({
      user_id: user.id,
      artist,
      venue,
      concert_date: concertDate,
      fun_rating: funRating,
      notes,
    })
    .select("id")
    .single();

  if (concertError || !concert) {
    return {
      error: "We could not save your concert. Please try again in a moment.",
    };
  }

  const costRows = costs.map((c) => ({
    concert_id: concert.id,
    category: c.category,
    amount: c.amount,
    description: c.description,
  }));

  const { error: costsError } = await supabase
    .from("concert_costs")
    .insert(costRows);

  if (costsError) {
    return {
      error:
        "Your concert was saved but some costs failed. Try adding them again later.",
    };
  }

  redirect("/?success=Concert saved!");
}
