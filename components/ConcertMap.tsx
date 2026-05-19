"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import type { ConcertWithCosts } from "@/lib/types";
import { getConcertCoordinates, hasExactCity } from "@/lib/us-cities";
import { formatCurrency, formatDate, concertTotal } from "@/lib/dashboard";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type MapPin = {
  id: string;
  coordinates: [number, number];
  label: string;
  artist: string;
  venue: string;
  date: string;
  total: number;
  approximate: boolean;
};

export function ConcertMap({ concerts }: { concerts: ConcertWithCosts[] }) {
  const stateCounts = new Map<string, number>();

  const pins: MapPin[] = concerts
    .map((concert) => {
      const state = concert.state ?? "";
      const count = stateCounts.get(state) ?? 0;
      stateCounts.set(state, count + 1);

      const coords = getConcertCoordinates(concert.city, concert.state, count);
      if (!coords) return null;

      return {
        id: concert.id,
        coordinates: coords,
        label: [concert.city, concert.state].filter(Boolean).join(", "),
        artist: concert.artist,
        venue: concert.venue,
        date: formatDate(concert.concert_date),
        total: concertTotal(concert),
        approximate: !hasExactCity(concert.city, concert.state),
      };
    })
    .filter((p): p is MapPin => p !== null);

  const withCity = concerts.filter((c) => c.city && c.state).length;
  const missing = concerts.length - pins.length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 text-sm text-base-content/70">
        <span className="badge badge-outline">
          {pins.length} pin{pins.length === 1 ? "" : "s"} on map
        </span>
        {missing > 0 && (
          <span className="badge badge-warning badge-outline">
            {missing} concert{missing === 1 ? "" : "s"} missing state
          </span>
        )}
        <span className="badge badge-ghost">
          {withCity} with city for precise placement
        </span>
      </div>

      <div className="app-card overflow-hidden p-2 sm:p-4">
        <ComposableMap
          projection="geoAlbersUsa"
          width={800}
          height={480}
          className="mx-auto w-full max-w-4xl"
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="oklch(var(--b3))"
                  stroke="oklch(var(--bc) / 0.2)"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "oklch(var(--p) / 0.15)", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {pins.map((pin) => (
            <Marker key={pin.id} coordinates={pin.coordinates}>
              <g className="group cursor-pointer">
                <circle r={6} fill="oklch(var(--p))" stroke="#fff" strokeWidth={1.5} />
                <title>
                  {pin.artist} — {pin.label}
                  {pin.approximate ? " (approximate)" : ""}
                  {"\n"}
                  {pin.venue} · {pin.date} · {formatCurrency(pin.total)}
                </title>
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      <p className="text-xs text-base-content/60">
        Pins use city coordinates when available; otherwise they appear near the state center.
      </p>
    </div>
  );
}
