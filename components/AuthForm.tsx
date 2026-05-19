"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthState } from "@/app/login/actions";
import { AlertBanner } from "./AlertBanner";

type AuthFormProps = {
  mode: "login" | "signup";
  action: (prevState: AuthState, formData: FormData) => Promise<AuthState>;
  title: string;
  submitLabel: string;
  alternateHref: string;
  alternateText: string;
  alternateLinkLabel: string;
};

export function AuthForm({
  mode,
  action,
  title,
  submitLabel,
  alternateHref,
  alternateText,
  alternateLinkLabel,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <div className="card bg-base-100 shadow-2xl">
      <div className="card-body gap-5 p-6 sm:p-8">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mt-1 text-sm text-base-content/70">
            {mode === "login"
              ? "Log in to see your concerts and spending."
              : "Create an account to start tracking concerts."}
          </p>
        </div>

        {state.error && (
          <AlertBanner message={state.error} variant="error" dismissible={false} />
        )}
        {state.message && (
          <AlertBanner message={state.message} variant="success" dismissible={false} />
        )}

        <form
          action={formAction}
          className="flex flex-col gap-4"
          aria-busy={pending}
        >
          <label className="form-control w-full">
            <span className="label">
              <span className="label-text font-medium">Email</span>
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="input input-bordered input-primary w-full"
              placeholder="you@example.com"
            />
          </label>
          <label className="form-control w-full">
            <span className="label">
              <span className="label-text font-medium">Password</span>
            </span>
            <input
              type="password"
              name="password"
              required
              minLength={mode === "signup" ? 6 : undefined}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              className="input input-bordered input-primary w-full"
              placeholder="••••••••"
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary mt-1"
            disabled={pending}
          >
            {pending ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Please wait…
              </>
            ) : (
              submitLabel
            )}
          </button>
        </form>

        <p className="text-center text-sm text-base-content/70">
          {alternateText}{" "}
          <Link href={alternateHref} className="link link-primary font-medium">
            {alternateLinkLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}
