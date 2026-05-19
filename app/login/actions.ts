"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: string;
  message?: string;
};

function authRedirectUrl() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";
  return `${base}/auth/callback`;
}

function mapAuthError(message: string, code?: string): string {
  if (code === "email_not_confirmed" || message.includes("Email not confirmed")) {
    return "Your email is not confirmed yet. Check your inbox (and spam) for the confirmation link from Supabase, click it, then try logging in again.";
  }
  if (code === "invalid_credentials" || message.includes("Invalid login")) {
    return "That email or password does not match our records. Try again or sign up first.";
  }
  if (code === "user_already_registered") {
    return "An account with this email already exists. Try logging in instead.";
  }
  return message;
}

export async function login(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      error: mapAuthError(error.message, error.code),
    };
  }

  redirect("/");
}

export async function signup(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter your email and a password." };
  }

  if (password.length < 6) {
    return { error: "Your password must be at least 6 characters long." };
  }

  const supabase = await createClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: authRedirectUrl(),
    },
  });

  if (error) {
    return {
      error: mapAuthError(error.message, error.code),
    };
  }

  if (data.user && !data.session) {
    return {
      message:
        "We sent a confirmation link to your email. Open that link, then come back here and log in. Check your spam folder if you do not see it within a few minutes.",
    };
  }

  redirect("/");
}
