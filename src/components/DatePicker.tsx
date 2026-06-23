"use client";

import { useState, useRef, useEffect } from "react";

const DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7; // Monday = 0
}

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  min?: string;
}

export default function DatePicker({ value, onChange, min }: DatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value + "T00:00:00") : null;
  const minDate = min ? new Date(min + "T00:00:00") : today;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const handleDayClick = (cell: { day: number; current: boolean; date: Date }) => {
    if (!cell.current || cell.date < minDate) return;
    const dateStr = `${cell.date.getFullYear()}-${String(cell.date.getMonth() + 1).padStart(2, "0")}-${String(cell.date.getDate()).padStart(2, "0")}`;
    onChange(dateStr);
    setOpen(false);
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const prevMonthDays = getDaysInMonth(viewYear, viewMonth === 0 ? 11 : viewMonth - 1);

  const cells: { day: number; current: boolean; date: Date }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m = viewMonth === 0 ? 11 : viewMonth - 1;
    const y = viewMonth === 0 ? viewYear - 1 : viewYear;
    cells.push({ day: d, current: false, date: new Date(y, m, d) });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true, date: new Date(viewYear, viewMonth, d) });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = viewMonth === 11 ? 0 : viewMonth + 1;
    const y = viewMonth === 11 ? viewYear + 1 : viewYear;
    cells.push({ day: d, current: false, date: new Date(y, m, d) });
  }

  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <div ref={ref} className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-3 rounded-xl text-sm text-left outline-none"
        style={{
          backgroundColor: "var(--color-surface)",
          color: value ? "var(--color-on-surface)" : "var(--color-on-surface-muted)",
        }}
      >
        {displayValue || "Fecha del evento"}
      </button>

      {open && (
        <div
          className="absolute z-30 top-full mt-2 p-5 rounded-2xl shadow-2xl"
          style={{ backgroundColor: "var(--color-surface-elevated)", width: "280px" }}
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-5">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-base font-bold transition-opacity hover:opacity-70"
              style={{ backgroundColor: "var(--color-surface)", color: "var(--color-on-surface)" }}
            >
              ‹
            </button>
            <span className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-base font-bold transition-opacity hover:opacity-70"
              style={{ backgroundColor: "var(--color-surface)", color: "var(--color-on-surface)" }}
            >
              ›
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-3">
            {DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-semibold py-1"
                style={{ color: "var(--color-on-surface-muted)" }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((cell, i) => {
              const isSelected =
                selectedDate &&
                cell.date.getDate() === selectedDate.getDate() &&
                cell.date.getMonth() === selectedDate.getMonth() &&
                cell.date.getFullYear() === selectedDate.getFullYear();
              const isPast = cell.date < minDate;
              const isToday = cell.date.toDateString() === today.toDateString();
              const isDisabled = !cell.current || isPast;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleDayClick(cell)}
                  disabled={isDisabled}
                  className="w-8 h-8 mx-auto flex items-center justify-center rounded-full text-xs transition-all"
                  style={{
                    backgroundColor: isSelected ? "var(--color-primary)" : "transparent",
                    color: isSelected
                      ? "var(--color-on-primary)"
                      : isDisabled
                      ? "var(--color-on-surface-muted)"
                      : "var(--color-on-surface)",
                    opacity: isDisabled ? 0.3 : 1,
                    fontWeight: isToday && !isSelected ? 700 : 400,
                    cursor: isDisabled ? "default" : "pointer",
                    outline: isToday && !isSelected ? "1px solid var(--color-on-surface-muted)" : "none",
                  }}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
