"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function DrawerCloser() {
  const pathname = usePathname();

  useEffect(() => {
    const checkbox = document.getElementById(
      "app-drawer"
    ) as HTMLInputElement | null;
    if (checkbox) checkbox.checked = false;
  }, [pathname]);

  return null;
}
