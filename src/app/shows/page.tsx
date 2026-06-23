"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MusicianCard from "@/components/MusicianCard";
import GenreMultiSelect from "@/components/GenreMultiSelect";
import DatePicker from "@/components/DatePicker";
import { MUSICIANS, Musician } from "@/data/musicians";

const TIME_SLOTS = (() => {
  const slots: { label: string; value: string }[] = [];
  for (let h = 0; h < 24; h++) {
    for (const min of [0, 30]) {
      const period = h < 12 ? "AM" : "PM";
      const displayHour = h % 12 === 0 ? 12 : h % 12;
      const label = `${displayHour}:${min === 0 ? "00" : "30"} ${period}`;
      const value = `${String(h).padStart(2, "0")}:${min === 0 ? "00" : "30"}`;
      slots.push({ label, value });
    }
  }
  return slots;
})();

const PAGE_SIZE_OPTIONS = [6, 9, 15];
const SORT_OPTIONS = [
  { value: "newest", label: "Más recientes" },
  { value: "rating-desc", label: "Mejor calificación" },
  { value: "rating-asc", label: "Menor calificación" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "price-asc", label: "Menor precio" },
];

const today = new Date().toISOString().split("T")[0];

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialGenres = searchParams.get("generos")?.split(",").filter(Boolean) ?? [];
  const initialDate = searchParams.get("fecha") ?? "";
  const initialTime = searchParams.get("hora") ?? "";

  const [genres, setGenres] = useState<string[]>(initialGenres);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [sort, setSort] = useState("newest");
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);

  const hasFilters = genres.length > 0 || date !== "" || time !== "";

  const handleDateChange = (d: string) => {
    setDate(d);
    setTime("");
    setPage(1);
  };

  const clearFilters = () => {
    setGenres([]);
    setDate("");
    setTime("");
    setPage(1);
    router.replace("/shows");
  };

  const filtered: Musician[] = MUSICIANS.filter((m) => {
    if (genres.length > 0 && !genres.some((g) => m.genres.includes(g))) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "rating-desc": return b.rating - a.rating;
      case "rating-asc": return a.rating - b.rating;
      case "price-desc": return b.priceMax - a.priceMax;
      case "price-asc": return a.priceMin - b.priceMin;
      default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => { setPage(1); }, [genres, date, time, sort, pageSize]);

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen pt-24 pb-20 px-4 md:px-8"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--color-on-background)" }}>
              Shows
            </h1>
            <p className="text-sm" style={{ color: "var(--color-on-surface-muted)" }}>
              {sorted.length} {sorted.length === 1 ? "músico disponible" : "músicos disponibles"} en Bogotá
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <GenreMultiSelect value={genres} onChange={(g) => { setGenres(g); setPage(1); }} />
            <DatePicker value={date} onChange={handleDateChange} min={today} />
            <select
              value={time}
              onChange={(e) => { setTime(e.target.value); setPage(1); }}
              disabled={!date}
              className="px-4 py-3 rounded-xl text-sm outline-none disabled:opacity-40 md:w-36"
              style={{
                backgroundColor: "var(--color-surface)",
                color: time ? "var(--color-on-surface)" : "var(--color-on-surface-muted)",
              }}
            >
              <option value="">Hora</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot.value} value={slot.value}>{slot.label}</option>
              ))}
            </select>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-5 py-3 rounded-xl text-sm font-medium border transition-opacity hover:opacity-80"
                style={{
                  borderColor: "var(--color-on-surface-muted)",
                  color: "var(--color-on-surface-muted)",
                  backgroundColor: "transparent",
                }}
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Sort + page size */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm outline-none"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-on-surface)",
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface-muted)" }}>
              <span>Por página:</span>
              {PAGE_SIZE_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setPageSize(n)}
                  className="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: pageSize === n ? "var(--color-primary)" : "var(--color-surface)",
                    color: pageSize === n ? "var(--color-on-primary)" : "var(--color-on-surface-muted)",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg mb-6" style={{ color: "var(--color-on-surface-muted)" }}>
                Lo sentimos :( no encontramos shows asociados a tu búsqueda.<br />
                Puedes cambiar el filtro y buscar de nuevo.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-on-primary)",
                }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((m) => (
                <MusicianCard key={m.id} musician={m} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg text-sm disabled:opacity-30"
                style={{
                  backgroundColor: "var(--color-surface)",
                  color: "var(--color-on-surface)",
                }}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="w-9 h-9 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: page === n ? "var(--color-primary)" : "var(--color-surface)",
                    color: page === n ? "var(--color-on-primary)" : "var(--color-on-surface-muted)",
                  }}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg text-sm disabled:opacity-30"
                style={{
                  backgroundColor: "var(--color-surface)",
                  color: "var(--color-on-surface)",
                }}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function ShowsPage() {
  return (
    <Suspense>
      <CatalogContent />
    </Suspense>
  );
}
