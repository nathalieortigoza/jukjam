"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "./DatePicker";
import GenreMultiSelect from "./GenreMultiSelect";

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

const today = new Date().toISOString().split("T")[0];

export default function HeroSearch() {
  const router = useRouter();
  const [genres, setGenres] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (d: string) => {
    setDate(d);
    setTime("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (genres.length > 0) params.set("generos", genres.join(","));
    if (date) params.set("fecha", date);
    if (date && time) params.set("hora", time);
    router.push(`/shows?${params.toString()}`);
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[520px] px-6 py-20 text-center"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 65% 0%, rgba(190,31,58,0.18) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(47,82,223,0.12) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          style={{ color: "var(--color-on-background)" }}
        >
          ¿Qué show quieres vivir?
        </h1>
        <p className="text-base mb-10" style={{ color: "var(--color-on-surface-muted)" }}>
          Encuentra y contrata músicos alternativos en Bogotá
        </p>

        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full"
        >
          <GenreMultiSelect value={genres} onChange={setGenres} />

          <DatePicker value={date} onChange={handleDateChange} min={today} />

          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!date}
            className="px-4 py-3 rounded-xl text-sm outline-none disabled:opacity-40"
            style={{
              backgroundColor: "var(--color-surface)",
              color: time ? "var(--color-on-surface)" : "var(--color-on-surface-muted)",
            }}
          >
            <option value="">Hora</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="px-8 py-3 rounded-full font-semibold text-sm whitespace-nowrap"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
            }}
          >
            Buscar Shows
          </button>
        </form>
      </div>
    </section>
  );
}
