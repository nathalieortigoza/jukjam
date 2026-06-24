"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import DatePicker from "@/components/DatePicker";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import { MUSICIANS, formatCOP } from "@/data/musicians";
import type { Musician, ShowPackage } from "@/data/musicians";
import { useAuth } from "@/context/AuthContext";
import { saveBooking } from "@/data/bookings";

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

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(timeStr: string) {
  if (!timeStr) return "";
  const slot = TIME_SLOTS.find((s) => s.value === timeStr);
  return slot ? slot.label : timeStr;
}

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const today = new Date().toISOString().split("T")[0];

// Step indicator
function Steps({ current }: { current: number }) {
  const steps = ["Detalles", "Confirmar", "Pago"];
  return (
    <div className="flex items-center gap-2 mb-10">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = current > n;
        const active = current === n;
        return (
          <div key={n} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  backgroundColor: done || active ? "var(--color-primary)" : "var(--color-surface)",
                  color: done || active ? "var(--color-on-primary)" : "var(--color-on-surface-muted)",
                }}
              >
                {done ? "✓" : n}
              </div>
              <span
                className="text-sm font-medium hidden sm:block"
                style={{ color: active ? "var(--color-on-surface)" : "var(--color-on-surface-muted)" }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-8 h-px mx-1" style={{ backgroundColor: "var(--color-surface)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function BookingContent({ musicianId, packageId }: { musicianId: string; packageId: string }) {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const musician = MUSICIANS.find((m) => m.id === musicianId);
  if (!musician) notFound();
  const pkg = musician.packages.find((p) => p.id === packageId);
  if (!pkg) notFound();

  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [step, setStep] = useState(1);
  const [confirmCode] = useState(generateCode);

  // Form state
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState(searchParams.get("fecha") ?? "");
  const [time, setTime] = useState(searchParams.get("hora") ?? "");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");

  const canSubmitStep1 = eventName.trim() && date && time && address.trim() && email.trim();

  // ── Auth gate ─────────────────────────────────────────────────
  if (!user) {
    return (
      <>
        <div className="max-w-lg mx-auto py-20 px-4">
          {/* Show summary */}
          <div
            className="flex items-center gap-4 p-5 rounded-2xl mb-10"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
              <Image src={musician!.photos[0]} alt={musician!.name} fill className="object-cover" sizes="64px" />
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "var(--color-on-surface-muted)" }}>Reservando</p>
              <p className="font-semibold text-base" style={{ color: "var(--color-on-surface)" }}>{pkg!.name}</p>
              <p className="text-sm" style={{ color: "var(--color-on-surface-muted)" }}>{musician!.name}</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--color-on-background)" }}>
            Inicia sesión para continuar
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: "var(--color-on-surface-muted)" }}>
            Necesitas una cuenta para completar tu reserva.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setAuthModal("register")}
              className="w-full py-4 rounded-full text-sm font-semibold"
              style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
            >
              Crear cuenta
            </button>
            <button
              onClick={() => setAuthModal("login")}
              className="w-full py-4 rounded-full text-sm font-semibold border"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "var(--color-on-surface)", backgroundColor: "transparent" }}
            >
              Ya tengo cuenta — Ingresa
            </button>
          </div>
        </div>

        {authModal === "login" && (
          <LoginModal onClose={() => setAuthModal(null)} onSwitchToRegister={() => setAuthModal("register")} />
        )}
        {authModal === "register" && (
          <RegisterModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal("login")} />
        )}
      </>
    );
  }

  // ── Step 1: form ──────────────────────────────────────────────
  if (step === 1) {
    return (
      <>
        <Steps current={1} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ color: "var(--color-on-surface-muted)" }}>
                Nombre del evento *
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Ej. Cumpleaños de la abuela, Cena de fin de año..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "var(--color-surface)", color: "var(--color-on-surface)" }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1.5 font-medium" style={{ color: "var(--color-on-surface-muted)" }}>
                  Fecha *
                </label>
                <DatePicker value={date} onChange={(d) => { setDate(d); setTime(""); }} min={today} />
              </div>
              <div>
                <label className="block text-xs mb-1.5 font-medium" style={{ color: "var(--color-on-surface-muted)" }}>
                  Hora *
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={!date}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none disabled:opacity-40"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    color: time ? "var(--color-on-surface)" : "var(--color-on-surface-muted)",
                  }}
                >
                  <option value="">Selecciona una hora</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.value} value={slot.value}>{slot.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ color: "var(--color-on-surface-muted)" }}>
                Dirección del evento *
                <span className="ml-2 font-normal opacity-60">Por ahora solo operamos en Bogotá.</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. Cra 7 #45-12, Chapinero, Bogotá"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "var(--color-surface)", color: "var(--color-on-surface)" }}
              />
            </div>

            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ color: "var(--color-on-surface-muted)" }}>
                Descripción del evento / sugerencias de canciones
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Cuéntale al músico cómo es tu evento, si tienes canciones favoritas o peticiones especiales..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ backgroundColor: "var(--color-surface)", color: "var(--color-on-surface)" }}
              />
            </div>

            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ color: "var(--color-on-surface-muted)" }}>
                Correo de confirmación *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "var(--color-surface)", color: "var(--color-on-surface)" }}
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canSubmitStep1}
              className="w-full py-3 rounded-full text-sm font-semibold disabled:opacity-40 transition-opacity"
              style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
            >
              Continuar
            </button>
          </div>

          {/* Sidebar */}
          <BookingSidebar musician={musician} pkg={pkg} />
        </div>
      </>
    );
  }

  // ── Step 2: review ────────────────────────────────────────────
  if (step === 2) {
    return (
      <>
        <Steps current={2} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--color-surface)" }}>
              {(
                [
                  ["Evento", eventName],
                  ["Músico", musician.name],
                  ["Show", `${pkg.name} · ${pkg.duration}`],
                  ["Fecha", formatDate(date)],
                  ["Hora", formatTime(time)],
                  ["Dirección", address],
                  ["Correo", email],
                  ...(notes ? [["Notas", notes]] : []),
                ] as [string, string][]
              ).map(([label, val], i, arr) => (
                <div
                  key={label}
                  className="flex gap-4 px-6 py-4"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                >
                  <span className="text-sm w-24 shrink-0" style={{ color: "var(--color-on-surface-muted)" }}>{label}</span>
                  <span className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>{val}</span>
                </div>
              ))}
            </div>

            <div
              className="flex items-center justify-between px-6 py-4 rounded-2xl"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <span className="text-base font-semibold" style={{ color: "var(--color-on-surface)" }}>Total</span>
              <span className="text-xl font-bold" style={{ color: "var(--color-on-surface)" }}>{formatCOP(pkg.price)}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-full text-sm font-semibold border transition-opacity hover:opacity-80"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "var(--color-on-surface-muted)", backgroundColor: "transparent" }}
              >
                Editar
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
              >
                Confirmo, ir al pago
              </button>
            </div>
          </div>

          <BookingSidebar musician={musician} pkg={pkg} />
        </div>
      </>
    );
  }

  // ── Step 3: pago ──────────────────────────────────────────────
  if (step === 3) {
    return (
      <>
        <Steps current={3} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl p-8 text-center"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <div className="mb-6">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                  style={{ backgroundColor: "rgba(47,82,223,0.15)", color: "var(--color-primary)" }}
                >
                  🔒 Pago seguro con Wompi
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: "var(--color-on-surface)" }}>
                  {formatCOP(pkg.price)}
                </p>
                <p className="text-sm" style={{ color: "var(--color-on-surface-muted)" }}>
                  {pkg.name} · {musician.name}
                </p>
              </div>

              <div
                className="rounded-xl p-4 mb-6 text-left text-sm"
                style={{ backgroundColor: "var(--color-surface-elevated)", color: "var(--color-on-surface-muted)" }}
              >
                Tu pago queda retenido hasta que el show se confirme con el código de verificación. Si algo sale mal, te devolvemos el 100%.
              </div>

              <button
                onClick={() => {
                  saveBooking({
                    id: confirmCode,
                    eventName,
                    date,
                    time,
                    address,
                    musicianId: musician!.id,
                    musicianName: musician!.name,
                    musicianPhoto: musician!.photos[0],
                    packageName: pkg!.name,
                    price: pkg!.price,
                    confirmCode,
                    status: "pendiente",
                    createdAt: new Date().toISOString().split("T")[0],
                  });
                  setStep(4);
                }}
                className="w-full py-4 rounded-full text-base font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#00C574", color: "#fff" }}
              >
                Pagar con Wompi →
              </button>

              <button
                onClick={() => setStep(2)}
                className="mt-4 w-full text-sm"
                style={{ color: "var(--color-on-surface-muted)" }}
              >
                ← Volver al resumen
              </button>
            </div>
          </div>

          <BookingSidebar musician={musician} pkg={pkg} />
        </div>
      </>
    );
  }

  // ── Step 4: confirmación ──────────────────────────────────────
  return (
    <div className="flex flex-col items-center text-center max-w-lg mx-auto py-8">
      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6" style={{ outline: "4px solid var(--color-primary)", outlineOffset: "2px" }}>
        <Image src={musician.photos[0]} alt={musician.name} fill className="object-cover" sizes="96px" />
      </div>

      <div className="text-4xl mb-4">🎉</div>
      <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--color-on-background)" }}>
        ¡Felicitaciones!
      </h2>
      <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-muted)" }}>
        Tu reserva está confirmada. Revisa tu correo y WhatsApp.
      </p>

      <div
        className="w-full rounded-2xl overflow-hidden mb-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        {(
          [
            ["Músico", musician.name],
            ["Show", pkg.name],
            ["Fecha", formatDate(date)],
            ["Hora", formatTime(time)],
            ["Lugar", address],
          ] as [string, string][]
        ).map(([label, val], i, arr) => (
          <div
            key={label}
            className="flex gap-4 px-6 py-4"
            style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
          >
            <span className="text-sm w-24 shrink-0" style={{ color: "var(--color-on-surface-muted)" }}>{label}</span>
            <span className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>{val}</span>
          </div>
        ))}
      </div>

      <div
        className="w-full rounded-2xl p-6 mb-8"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-on-surface-muted)" }}>
          Código de confirmación
        </p>
        <p className="text-4xl font-bold tracking-[0.3em]" style={{ color: "var(--color-primary)" }}>
          {confirmCode}
        </p>
        <p className="text-xs mt-3" style={{ color: "var(--color-on-surface-muted)" }}>
          Comparte este código con el músico al inicio del show para liberar el pago.
        </p>
      </div>

      <Link
        href="/tablero"
        className="w-full py-3 rounded-full text-sm font-semibold text-center"
        style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
      >
        Ir a mis eventos
      </Link>
    </div>
  );
}

function BookingSidebar({ musician, pkg }: { musician: Musician; pkg: ShowPackage }) {
  return (
    <div
      className="rounded-2xl p-6 h-fit"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4">
        <Image
          src={musician.photos[0]}
          alt={musician.name}
          fill
          className="object-cover"
          sizes="300px"
        />
      </div>
      <h3 className="font-semibold text-base mb-1" style={{ color: "var(--color-on-surface)" }}>
        {musician.name}
      </h3>
      <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-muted)" }}>
        {pkg.name} · {pkg.duration}
      </p>
      <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="text-sm" style={{ color: "var(--color-on-surface-muted)" }}>Total</span>
        <span className="text-lg font-bold" style={{ color: "var(--color-on-surface)" }}>{formatCOP(pkg.price)}</span>
      </div>
    </div>
  );
}

export default function ReservaPage({ params }: { params: Promise<{ musicianId: string; packageId: string }> }) {
  const { musicianId, packageId } = use(params);

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-24 pb-20 px-4 md:px-8"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link
              href={`/shows/${musicianId}`}
              className="inline-flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-70"
              style={{ color: "var(--color-on-surface-muted)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver al perfil
            </Link>
            <h1 className="text-2xl font-bold" style={{ color: "var(--color-on-background)" }}>
              Solicitud de reserva
            </h1>
          </div>

          <Suspense>
            <BookingContent musicianId={musicianId} packageId={packageId} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
