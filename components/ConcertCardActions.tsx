"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteConcert } from "@/app/concerts/actions";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function ConcertCardActions({ concertId }: { concertId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteConcert(concertId);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Concert deleted");
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 border-t border-base-300 pt-3">
        <Link
          href={`/concerts/${concertId}/edit`}
          className="btn btn-outline btn-sm gap-1"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden />
          Edit
        </Link>
        <button
          type="button"
          className="btn btn-outline btn-error btn-sm gap-1"
          onClick={() => setOpen(true)}
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
          Delete
        </button>
      </div>

      {open && (
        <dialog className="modal modal-open" open>
          <div className="modal-box">
            <h3 className="text-lg font-bold">Delete this concert?</h3>
            <p className="py-2 text-sm text-base-content/80">
              This removes the concert and all of its costs. This cannot be undone.
            </p>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-error"
                onClick={handleDelete}
                disabled={pending}
              >
                {pending ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button type="button" onClick={() => setOpen(false)}>
              close
            </button>
          </form>
        </dialog>
      )}
    </>
  );
}
