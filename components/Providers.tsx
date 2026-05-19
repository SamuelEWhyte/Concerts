"use client";

import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { ToastListener } from "./ToastListener";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster position="top-center" richColors closeButton />
      <Suspense fallback={null}>
        <ToastListener />
      </Suspense>
    </ThemeProvider>
  );
}
