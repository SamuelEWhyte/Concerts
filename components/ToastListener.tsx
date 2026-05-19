"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function ToastListener() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success");
    const error = searchParams.get("error_description");

    if (success) {
      toast.success(success);
      const url = new URL(window.location.href);
      url.searchParams.delete("success");
      window.history.replaceState({}, "", url.pathname + url.search);
    }

    if (error) {
      toast.error(decodeURIComponent(error.replace(/\+/g, " ")));
    }
  }, [searchParams]);

  return null;
}
