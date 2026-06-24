"use client";

import { useState, useRef, useEffect } from "react";

const GENRES = [
  "Jazz",
  "Folk",
  "Música de autor",
  "Rock acústico",
  "Salsa",
  "Tango-pop",
  "Jazz fusión",
  "Música romántica",
  "Blues",
  "Boleros",
];

interface GenreMultiSelectProps {
  value: string[];
  onChange: (genres: string[]) => void;
}

export default function GenreMultiSelect({ value, onChange }: GenreMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState<string[]>(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open) setPending(value);
  }, [open]);

  const filtered = GENRES.filter((g) =>
    g.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (g: string) => {
    const next = pending.includes(g) ? pending.filter((x) => x !== g) : [...pending, g];
    setPending(next);
    onChange(next);
  };

  const apply = () => {
    onChange(pending);
    setOpen(false);
  };

  const clear = () => {
    setPending([]);
    onChange([]);
  };

  const label =
    value.length === 0
      ? "Género musical"
      : value.length === 1
      ? value[0]
      : `${value.length} géneros`;

  return (
    <div ref={ref} className="relative flex-1">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm outline-none"
        style={{
          backgroundColor: "var(--color-surface)",
          color: value.length > 0 ? "var(--color-on-surface)" : "var(--color-on-surface-muted)",
        }}
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute z-30 top-full mt-2 w-72 rounded-2xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: "var(--color-surface-elevated)" }}
        >
          {/* Search */}
          <div className="p-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: "var(--color-surface)" }}>
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: "var(--color-on-surface-muted)" }}>
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar género..."
                className="flex-1 text-sm bg-transparent outline-none"
                style={{ color: "var(--color-on-surface)" }}
              />
            </div>
          </div>

          {/* Options */}
          <ul className="max-h-52 overflow-y-auto py-2">
            {filtered.length > 0 ? (
              filtered.map((g) => {
                const checked = pending.includes(g);
                return (
                  <li key={g}>
                    <button
                      type="button"
                      onClick={() => toggle(g)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-opacity hover:opacity-80"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      {/* Checkbox */}
                      <span
                        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors"
                        style={{
                          backgroundColor: checked ? "var(--color-primary)" : "transparent",
                          borderColor: checked ? "var(--color-primary)" : "var(--color-on-surface-muted)",
                        }}
                      >
                        {checked && (
                          <svg className="w-3 h-3" fill="none" stroke="white" strokeWidth={3} viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      {g}
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-3 text-sm" style={{ color: "var(--color-on-surface-muted)" }}>
                Género no disponible
              </li>
            )}
          </ul>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-4 py-3 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <span className="text-xs" style={{ color: "var(--color-on-surface-muted)" }}>
              {pending.length > 0 ? `Seleccionados: ${pending.length}` : ""}
            </span>
            <button
              type="button"
              onClick={clear}
              className="text-xs underline"
              style={{ color: "var(--color-on-surface-muted)" }}
            >
              Limpiar
            </button>
          </div>

          <div className="px-3 pb-3">
            <button
              type="button"
              onClick={apply}
              className="w-full py-2.5 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
              }}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
