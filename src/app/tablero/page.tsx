"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MusicianCard from "@/components/MusicianCard";
import { useAuth } from "@/context/AuthContext";
import { formatCOP, MUSICIANS } from "@/data/musicians";
import { Booking, BookingStatus, getBookings, cancelBooking, seedMockBookings } from "@/data/bookings";

const EVENT_TABS: { key: BookingStatus; label: string }[] = [
  { key: "pendiente",  label: "Pendientes"  },
  { key: "completado", label: "Completados" },
  { key: "cancelado",  label: "Cancelados"  },
];

const STATUS_STYLES: Record<BookingStatus, { bg: string; color: string }> = {
  pendiente:  { bg: "rgba(47,82,223,0.15)", color: "var(--color-primary)" },
  completado: { bg: "rgba(0,197,116,0.15)", color: "#00C574"              },
  cancelado:  { bg: "rgba(190,31,58,0.15)", color: "#BE1F3A"              },
};

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("es-CO", {
    weekday: "short", day: "numeric", month: "long", year: "numeric",
  });
}

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${period}`;
}

function CancelModal({ booking, onConfirm, onClose }: {
  booking: Booking; onConfirm: () => void; onClose: () => void;
}) {
  const daysUntil = Math.ceil(
    (new Date(booking.date + "T00:00:00").getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const fullRefund = daysUntil >= 7;
  const refundPct = fullRefund ? 100 : 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-3xl p-8 text-center" style={{ backgroundColor: "var(--color-surface)" }}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl" style={{ overflow: "hidden" }}>
            <Image src={booking.musicianPhoto} alt={booking.musicianName} width={56} height={56} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i === 1 ? "#BE1F3A" : "var(--color-on-surface-muted)", opacity: i === 1 ? 1 : 0.4 }} />
            ))}
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: fullRefund ? "rgba(0,197,116,0.15)" : "rgba(190,31,58,0.12)" }}>
            <svg className="w-7 h-7" fill="none" stroke={fullRefund ? "#00C574" : "#BE1F3A"} strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M9 14l-4-4 4-4M5 10h14M15 10l4 4-4 4" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-1" style={{ color: "var(--color-on-surface)" }}>¿Cancelar reserva?</h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-on-surface-muted)" }}>{booking.eventName} · {booking.musicianName}</p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-7"
          style={{ backgroundColor: fullRefund ? "rgba(0,197,116,0.15)" : "rgba(190,31,58,0.12)", color: fullRefund ? "#00C574" : "#BE1F3A" }}>
          {fullRefund ? "✓" : "⚠"} Devolución del {refundPct}% · {formatCOP(booking.price * refundPct / 100)}
        </div>

        <button onClick={onConfirm} className="w-full py-3.5 rounded-full text-sm font-semibold mb-3" style={{ backgroundColor: "#BE1F3A", color: "#fff" }}>
          Confirmar cancelación
        </button>
        <button onClick={onClose} className="w-full text-sm py-2" style={{ color: "var(--color-on-surface-muted)" }}>
          Volver
        </button>
      </div>
    </div>
  );
}

function EventCard({ booking, onCancel }: { booking: Booking; onCancel: () => void }) {
  const st = STATUS_STYLES[booking.status];
  return (
    <div style={{ backgroundColor: "var(--color-surface)", borderRadius: 16, padding: 20, borderLeft: `4px solid ${st.color}` }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
        <div>
          <p style={{ fontWeight: 600, fontSize: 15, color: "var(--color-on-surface)", marginBottom: 2 }}>{booking.eventName}</p>
          <p style={{ fontSize: 12, color: "var(--color-on-surface-muted)" }}>{formatDate(booking.date)} · {formatTime(booking.time)}</p>
        </div>
        <span style={{ backgroundColor: st.bg, color: st.color, fontSize: 12, fontWeight: 500, padding: "3px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>
          {booking.status}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
          <Image src={booking.musicianPhoto} alt={booking.musicianName} width={40} height={40} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 500, color: "var(--color-on-surface)" }}>{booking.musicianName}</p>
          <p style={{ fontSize: 12, color: "var(--color-on-surface-muted)" }}>{booking.packageName} · {formatCOP(booking.price)}</p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--color-on-surface-muted)" }}>Código:</span>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", color: "var(--color-primary)" }}>{booking.confirmCode}</span>
        </div>
        {booking.status === "pendiente" && (
          <button onClick={onCancel} style={{ fontSize: 12, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(190,31,58,0.5)", color: "#BE1F3A", backgroundColor: "transparent", cursor: "pointer" }}>
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

type Section = "eventos" | "seguidos";

export default function TabladerPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [section, setSection] = useState<Section>("eventos");
  const [eventTab, setEventTab] = useState<BookingStatus>("pendiente");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [followedIds, setFollowedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) { router.replace("/"); return; }
    seedMockBookings();
    setBookings(getBookings());
    setFollowedIds(JSON.parse(localStorage.getItem("jukjam_following") ?? "[]"));
  }, [user]);

  const confirmCancel = () => {
    if (!cancelTarget) return;
    cancelBooking(cancelTarget.id);
    setBookings(getBookings());
    setCancelTarget(null);
  };

  const filtered = bookings.filter((b) => b.status === eventTab);
  const followedMusicians = MUSICIANS.filter((m) => followedIds.includes(m.id));

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-24 pb-20 px-4 md:px-8" style={{ backgroundColor: "var(--color-background)" }}>
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <p className="text-sm mb-1" style={{ color: "var(--color-on-surface-muted)" }}>Hola, {user?.name.split(" ")[0]}</p>
            <h1 className="text-3xl font-bold" style={{ color: "var(--color-on-background)" }}>Mi tablero</h1>
          </div>

          {/* Top nav */}
          <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit" style={{ backgroundColor: "var(--color-surface)" }}>
            {(["eventos", "seguidos"] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className="px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all"
                style={{
                  backgroundColor: section === s ? "var(--color-surface-elevated)" : "transparent",
                  color: section === s ? "var(--color-on-surface)" : "var(--color-on-surface-muted)",
                }}
              >
                {s === "eventos" ? "Mis Eventos" : "Seguidos"}
              </button>
            ))}
            <Link href="/shows" className="px-5 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80" style={{ color: "var(--color-on-surface-muted)" }}>
              Catálogo
            </Link>
          </div>

          {/* Eventos */}
          {section === "eventos" && (
            <div>
              <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ backgroundColor: "var(--color-surface)" }}>
                {EVENT_TABS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setEventTab(key)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: eventTab === key ? "var(--color-surface-elevated)" : "transparent",
                      color: eventTab === key ? "var(--color-on-surface)" : "var(--color-on-surface-muted)",
                    }}
                  >
                    {label}
                    {key === "pendiente" && bookings.filter((b) => b.status === "pendiente").length > 0 && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}>
                        {bookings.filter((b) => b.status === "pendiente").length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {filtered.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {filtered.map((b) => (
                    <EventCard key={b.id} booking={b} onCancel={() => setCancelTarget(b)} />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-base mb-4" style={{ color: "var(--color-on-surface-muted)" }}>
                    No tienes eventos {eventTab === "pendiente" ? "pendientes" : eventTab === "completado" ? "completados" : "cancelados"}.
                  </p>
                  <Link href="/shows" className="inline-block px-6 py-3 rounded-full text-sm font-semibold" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}>
                    Explorar músicos
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Seguidos */}
          {section === "seguidos" && (
            <div>
              {followedMusicians.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {followedMusicians.map((m) => <MusicianCard key={m.id} musician={m} />)}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <p className="text-base mb-4" style={{ color: "var(--color-on-surface-muted)" }}>
                    Aún no sigues a ningún músico.
                  </p>
                  <Link href="/shows" className="inline-block px-6 py-3 rounded-full text-sm font-semibold" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}>
                    Explorar músicos
                  </Link>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {cancelTarget && (
        <CancelModal booking={cancelTarget} onConfirm={confirmCancel} onClose={() => setCancelTarget(null)} />
      )}
    </>
  );
}
