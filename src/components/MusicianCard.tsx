"use client";

import Image from "next/image";
import Link from "next/link";
import { Musician, formatCOP } from "@/data/musicians";

export default function MusicianCard({ musician }: { musician: Musician }) {
  return (
    <Link
      href={`/shows/${musician.id}`}
      className="group block rounded-2xl overflow-hidden transition-transform hover:-translate-y-1"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={musician.photos[0]}
          alt={musician.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="text-base font-semibold leading-snug"
            style={{ color: "var(--color-on-surface)" }}
          >
            {musician.name}
          </h3>
          <span
            className="text-sm shrink-0"
            style={{ color: "var(--color-on-surface-muted)" }}
          >
            ⭐ {musician.rating.toFixed(1)}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {musician.genres.map((g) => (
            <span
              key={g}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                color: "var(--color-on-surface-muted)",
              }}
            >
              {g}
            </span>
          ))}
        </div>

        <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
          {formatCOP(musician.priceMin)} – {formatCOP(musician.priceMax)}
        </p>
      </div>
    </Link>
  );
}
