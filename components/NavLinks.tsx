"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/concerts/new", label: "Add concert", icon: PlusCircle, exact: false },
];

function linkClass(active: boolean, className = "") {
  return [
    "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors",
    active
      ? "bg-primary text-primary-content font-medium"
      : "hover:bg-base-300/80",
    className,
  ].join(" ");
}

export function NavLinks({ variant = "horizontal" }: { variant?: "horizontal" | "drawer" }) {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={
              variant === "horizontal"
                ? linkClass(active, "btn btn-sm border-0")
                : linkClass(active, "w-full")
            }
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            {label}
          </Link>
        );
      })}
    </>
  );
}
