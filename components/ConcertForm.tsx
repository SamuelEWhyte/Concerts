"use client";

import { useActionState, useState } from "react";
import {
  createConcert,
  updateConcert,
  type ConcertFormState,
} from "@/app/concerts/actions";
import { COST_CATEGORIES, US_STATES } from "@/lib/constants";
import { FunRatingInput } from "./FunRatingInput";
import { AlertBanner } from "./AlertBanner";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Plus } from "lucide-react";
import type { ConcertWithCosts } from "@/lib/types";

type CostRow = {
  id: string;
  category: string;
  amount: string;
  description: string;
};

function newRow(cost?: { category: string; amount: string; description: string }): CostRow {
  return {
    id: crypto.randomUUID(),
    category: cost?.category ?? "ticket",
    amount: cost?.amount ?? "",
    description: cost?.description ?? "",
  };
}

type ConcertFormProps = {
  mode: "create" | "edit";
  concert?: ConcertWithCosts;
};

export function ConcertForm({ mode, concert }: ConcertFormProps) {
  const action =
    mode === "create"
      ? createConcert
      : updateConcert.bind(null, concert!.id);

  const [state, formAction, pending] = useActionState<
    ConcertFormState,
    FormData
  >(action, {});

  const [funRating, setFunRating] = useState(concert?.fun_rating ?? 4);
  const [costRows, setCostRows] = useState<CostRow[]>(() => {
    const costs = concert?.concert_costs ?? [];
    if (costs.length === 0) return [newRow()];
    return costs.map((c) =>
      newRow({
        category: c.category,
        amount: String(c.amount),
        description: c.description ?? "",
      })
    );
  });
  const [costsParent] = useAutoAnimate();

  const addRow = () => setCostRows((rows) => [...rows, newRow()]);

  const updateRow = (id: string, patch: Partial<CostRow>) => {
    setCostRows((rows) =>
      rows.map((row) => (row.id === id ? { ...row, ...patch } : row))
    );
  };

  return (
    <form
      action={formAction}
      className="mx-auto max-w-2xl space-y-6"
      aria-busy={pending}
    >
      {state.error && (
        <AlertBanner message={state.error} variant="error" dismissible={false} />
      )}

      <fieldset className="app-card">
        <div className="card-body gap-4">
          <legend className="card-title px-1 text-lg font-semibold">
            Concert details
          </legend>
          <label className="form-control w-full">
            <span className="label-text font-medium">Artist / band</span>
            <input
              type="text"
              name="artist"
              required
              defaultValue={concert?.artist}
              className="input input-bordered input-primary mt-1 w-full"
              placeholder="Who did you see?"
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text font-medium">Venue</span>
            <input
              type="text"
              name="venue"
              required
              defaultValue={concert?.venue}
              className="input input-bordered input-primary mt-1 w-full"
              placeholder="Madison Square Garden"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-control w-full">
              <span className="label-text font-medium">City</span>
              <input
                type="text"
                name="city"
                required
                defaultValue={concert?.city ?? ""}
                className="input input-bordered input-primary mt-1 w-full"
                placeholder="New York"
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text font-medium">State</span>
              <select
                name="state"
                required
                defaultValue={concert?.state ?? ""}
                className="select select-bordered select-primary mt-1 w-full"
              >
                <option value="" disabled>
                  Select state
                </option>
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code} — {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="form-control w-full">
            <span className="label-text font-medium">Date</span>
            <input
              type="date"
              name="concert_date"
              required
              defaultValue={concert?.concert_date}
              className="input input-bordered input-primary mt-1 w-full"
            />
          </label>
          <FunRatingInput value={funRating} onChange={setFunRating} />
          <label className="form-control w-full">
            <span className="label-text font-medium">
              Hours at show (optional, for Night Owl badge)
            </span>
            <input
              type="number"
              name="duration_hours"
              min="0"
              step="0.5"
              defaultValue={concert?.duration_hours ?? ""}
              className="input input-bordered input-primary mt-1 w-full"
              placeholder="e.g. 3"
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text font-medium">Notes (optional)</span>
            <textarea
              name="notes"
              defaultValue={concert?.notes ?? ""}
              className="textarea textarea-bordered textarea-primary mt-1 w-full"
              rows={3}
              placeholder="Anything you want to remember..."
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="app-card">
        <div className="card-body gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <legend className="card-title px-1 text-lg font-semibold">
              Costs
            </legend>
            <button
              type="button"
              className="btn btn-outline btn-sm gap-1"
              onClick={addRow}
            >
              <Plus className="h-4 w-4" aria-hidden />
              Add another cost
            </button>
          </div>

          <div ref={costsParent} className="space-y-3">
            {costRows.map((row, index) => (
              <div
                key={row.id}
                className="grid gap-3 rounded-xl border border-base-300 bg-base-200/30 p-4 sm:grid-cols-2"
              >
                <label className="form-control w-full">
                  <span className="label-text">Category</span>
                  <select
                    name="cost_category"
                    className="select select-bordered select-primary mt-1 w-full"
                    value={row.category}
                    onChange={(e) =>
                      updateRow(row.id, { category: e.target.value })
                    }
                  >
                    {COST_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-control w-full">
                  <span className="label-text">Amount ($)</span>
                  <input
                    type="number"
                    name="cost_amount"
                    min="0"
                    step="0.01"
                    required
                    className="input input-bordered input-primary mt-1 w-full"
                    placeholder="0.00"
                    value={row.amount}
                    onChange={(e) =>
                      updateRow(row.id, { amount: e.target.value })
                    }
                  />
                </label>
                <label className="form-control w-full sm:col-span-2">
                  <span className="label-text">Description (optional)</span>
                  <input
                    type="text"
                    name="cost_description"
                    className="input input-bordered mt-1 w-full"
                    placeholder={
                      index === 0 ? "e.g. General admission ticket" : ""
                    }
                    value={row.description}
                    onChange={(e) =>
                      updateRow(row.id, { description: e.target.value })
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        className="btn btn-primary btn-lg w-full"
        disabled={pending}
      >
        {pending ? (
          <>
            <span className="loading loading-spinner" />
            {mode === "create" ? "Saving…" : "Updating…"}
          </>
        ) : mode === "create" ? (
          "Save concert"
        ) : (
          "Save changes"
        )}
      </button>
    </form>
  );
}
