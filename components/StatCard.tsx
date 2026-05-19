import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  valueClassName?: string;
};

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  valueClassName = "",
}: StatCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-base-200/50 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-base-content/70">
        <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        {label}
      </div>
      <p className={`text-2xl font-bold tracking-tight lg:text-3xl ${valueClassName}`}>
        {value}
      </p>
      {hint ? <p className="text-xs text-base-content/60">{hint}</p> : null}
    </div>
  );
}
