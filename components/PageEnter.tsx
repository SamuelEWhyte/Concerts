"use client";

export function PageEnter({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      {children}
    </div>
  );
}
