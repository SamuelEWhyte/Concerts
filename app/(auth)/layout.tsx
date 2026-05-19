import { Music2 } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-300 p-4">
      <div className="mb-8 text-center">
        <div className="mb-3 flex justify-center">
          <Music2 className="h-10 w-10 text-primary" aria-hidden />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Concert Cost Tracker
        </h1>
        <p className="mt-1 text-sm text-base-content/70">
          Remember every show. Track every dollar.
        </p>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
