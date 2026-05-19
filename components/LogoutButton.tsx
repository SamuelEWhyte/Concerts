"use client";

import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm w-full justify-start gap-2 lg:w-auto lg:justify-center"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" aria-hidden />
      Log out
    </button>
  );
}
