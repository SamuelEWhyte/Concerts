import Link from "next/link";
import { Music2 } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";
import { LogoutButton } from "./LogoutButton";
import { NavLinks } from "./NavLinks";

export function Navbar() {
  return (
    <div className="navbar border-b border-base-300 bg-base-100/95 px-4 backdrop-blur-sm lg:px-8">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="app-drawer"
          className="btn btn-square btn-ghost drawer-button"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 text-lg font-semibold tracking-tight normal-case"
        >
          <Music2 className="h-6 w-6 text-primary" aria-hidden />
          <span className="hidden sm:inline">Concert Cost Tracker</span>
          <span className="sm:hidden">Concerts</span>
        </Link>
      </div>
      <div className="hidden flex-none items-center gap-2 lg:flex">
        <NavLinks variant="horizontal" />
        <ThemeSelector />
        <LogoutButton />
      </div>
    </div>
  );
}
