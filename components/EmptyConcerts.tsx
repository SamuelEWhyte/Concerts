import Image from "next/image";
import Link from "next/link";

export function EmptyConcerts() {
  return (
    <div className="app-card">
      <div className="card-body items-center py-12 text-center">
        <Image
          src="/empty-concerts.svg"
          alt=""
          width={280}
          height={196}
          className="mx-auto max-w-xs opacity-90"
          priority
        />
        <h2 className="mt-4 text-xl font-bold">No concerts yet</h2>
        <p className="mt-2 max-w-sm text-base-content/70">
          Log your first show to see spending totals, fun ratings, and charts
          here.
        </p>
        <Link href="/concerts/new" className="btn btn-primary mt-6">
          Add your first concert
        </Link>
      </div>
    </div>
  );
}
