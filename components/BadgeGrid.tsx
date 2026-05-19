import { computeBadges } from "@/lib/badges";
import type { ConcertWithCosts } from "@/lib/types";

export function BadgeGrid({ concerts }: { concerts: ConcertWithCosts[] }) {
  const badges = computeBadges(concerts);
  const unlocked = badges.filter((b) => b.unlocked).length;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Milestone badges</h2>
        <p className="text-sm text-base-content/70">
          {unlocked} of {badges.length} badges earned
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {badges.map((badge) => (
          <article
            key={badge.id}
            className={[
              "app-card p-4 transition-opacity",
              badge.unlocked ? "" : "opacity-50 grayscale",
            ].join(" ")}
            title={badge.description}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden>
                {badge.emoji}
              </span>
              <div className="min-w-0">
                <p className="font-semibold">{badge.name}</p>
                <p className="text-xs text-base-content/70">{badge.description}</p>
                {badge.unlocked ? (
                  <span className="badge badge-success badge-sm mt-2">Unlocked</span>
                ) : (
                  <span className="badge badge-ghost badge-sm mt-2">Locked</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
