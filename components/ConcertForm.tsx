"use client";

import { useActionState, useState } from "react";
import {
  createConcert,
  type ConcertFormState,
} from "@/app/concerts/new/actions";
import { COST_CATEGORIES } from "@/lib/constants";
import { FunRatingInput } from "./FunRatingInput";
import { AlertBanner } from "./AlertBanner";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Plus } from "lucide-react";

type CostRow = {
  id: string;
  category: string;
  amount: string;
  description: string;
};

function newRow(): CostRow {
  return {
    id: crypto.randomUUID(),
    category: "ticket",
    amount: "",
    description: "",
  };
}

export function ConcertForm() {
  const [state, formAction, pending] = useActionState<
    ConcertFormState,
    FormData
  >(createConcert, {});
  const [funRating, setFunRating] = useState(4);
  const [costRows, setCostRows] = useState<CostRow[]>([newRow()]);
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
              className="input input-bordered input-primary mt-1 w-full"
              placeholder="Where was the show?"
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text font-medium">Date</span>
            <input
              type="date"
              name="concert_date"
              required
              className="input input-bordered input-primary mt-1 w-full"
            />
          </label>
          <FunRatingInput value={funRating} onChange={setFunRating} />
          <label className="form-control w-full">
            <span className="label-text font-medium">Notes (optional)</span>
            <textarea
              name="notes"
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
            Saving…
          </>
        ) : (
          "Save concert"
        )}
      </button>
    </form>
  );
}
