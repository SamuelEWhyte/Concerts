import { Navbar } from "./Navbar";
import { ThemeSelector } from "./ThemeSelector";
import { LogoutButton } from "./LogoutButton";
import { NavLinks } from "./NavLinks";
import { DrawerCloser } from "./DrawerCloser";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />
      <DrawerCloser />
      <div className="drawer-content flex min-h-screen flex-col bg-base-200/30">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="app-drawer"
          className="drawer-overlay"
          aria-label="Close menu"
        />
        <aside className="flex min-h-full w-72 flex-col gap-2 border-r border-base-300 bg-base-200 p-4">
          <p className="menu-title px-2">Menu</p>
          <nav className="flex flex-col gap-1">
            <NavLinks variant="drawer" />
          </nav>
          <div className="mt-auto space-y-3 border-t border-base-300 pt-4">
            <p className="px-2 text-xs font-medium uppercase tracking-wide text-base-content/60">
              Theme
            </p>
            <ThemeSelector />
            <LogoutButton />
          </div>
        </aside>
      </div>
    </div>
  );
}
