"use server";

import { createClient } from "@/lib/supabase/server";
import { parseConcertForm, type ConcertFormState } from "@/lib/concert-form";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type { ConcertFormState };

async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

export async function createConcert(
  _prevState: ConcertFormState,
  formData: FormData
): Promise<ConcertFormState> {
  const parsed = parseConcertForm(formData);
  if ("error" in parsed) return parsed;

  const { supabase, user } = await getUser();
  if (!user) return { error: "You need to be logged in to save a concert." };

  const { data: concert, error: concertError } = await supabase
    .from("concerts")
    .insert({
      user_id: user.id,
      artist: parsed.artist,
      venue: parsed.venue,
      city: parsed.city,
      state: parsed.state,
      concert_date: parsed.concertDate,
      fun_rating: parsed.funRating,
      notes: parsed.notes,
      duration_hours: parsed.durationHours,
    })
    .select("id")
    .single();

  if (concertError || !concert) {
    return {
      error: "We could not save your concert. Please try again in a moment.",
    };
  }

  const costRows = parsed.costs.map((c) => ({
    concert_id: concert.id,
    category: c.category,
    amount: c.amount,
    description: c.description,
  }));

  const { error: costsError } = await supabase.from("concert_costs").insert(costRows);

  if (costsError) {
    return {
      error:
        "Your concert was saved but some costs failed. Try adding them again later.",
    };
  }

  redirect("/concerts?success=Concert saved!");
}

export async function updateConcert(
  concertId: string,
  _prevState: ConcertFormState,
  formData: FormData
): Promise<ConcertFormState> {
  const parsed = parseConcertForm(formData);
  if ("error" in parsed) return parsed;

  const { supabase, user } = await getUser();
  if (!user) return { error: "You need to be logged in to save changes." };

  const { data: existing, error: fetchError } = await supabase
    .from("concerts")
    .select("id")
    .eq("id", concertId)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !existing) {
    return { error: "We could not find that concert or you do not have permission to edit it." };
  }

  const { error: updateError } = await supabase
    .from("concerts")
    .update({
      artist: parsed.artist,
      venue: parsed.venue,
      city: parsed.city,
      state: parsed.state,
      concert_date: parsed.concertDate,
      fun_rating: parsed.funRating,
      notes: parsed.notes,
      duration_hours: parsed.durationHours,
    })
    .eq("id", concertId)
    .eq("user_id", user.id);

  if (updateError) {
    return { error: "We could not update your concert. Please try again." };
  }

  const { error: deleteCostsError } = await supabase
    .from("concert_costs")
    .delete()
    .eq("concert_id", concertId);

  if (deleteCostsError) {
    return { error: "Concert updated but costs could not be refreshed. Please try again." };
  }

  const costRows = parsed.costs.map((c) => ({
    concert_id: concertId,
    category: c.category,
    amount: c.amount,
    description: c.description,
  }));

  const { error: costsError } = await supabase.from("concert_costs").insert(costRows);

  if (costsError) {
    return { error: "Concert updated but new costs failed to save." };
  }

  revalidatePath("/");
  revalidatePath("/concerts");
  revalidatePath("/map");
  redirect("/concerts?success=Concert updated!");
}

export async function deleteConcert(concertId: string): Promise<{ error?: string }> {
  const { supabase, user } = await getUser();
  if (!user) return { error: "You need to be logged in to delete a concert." };

  const { error } = await supabase
    .from("concerts")
    .delete()
    .eq("id", concertId)
    .eq("user_id", user.id);

  if (error) {
    return { error: "We could not delete that concert. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/concerts");
  revalidatePath("/map");
  return {};
}
