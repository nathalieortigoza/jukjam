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
import { saveReview, hasReviewed, getReviews } from "@/data/reviews";

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

      <div
        className="relative w-full max-w-3xl rounded-2xl flex"
        style={{ backgroundColor: "var(--color-surface)", minHeight: "480px", overflow: "hidden" }}
      >
        {/* Left panel — image */}
        <div className="hidden md:flex relative w-2/5 shrink-0 flex-col justify-end p-8">
          <Image
            src="/cancel-collage.png"
            alt="Cancelación Jukjam"
            fill
            className="object-cover object-center"
            sizes="320px"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(11,13,31,0.95) 0%, rgba(190,31,58,0.4) 55%, rgba(47,82,223,0.2) 100%)" }}
          />
          <div className="relative z-10">
            <p className="text-2xl font-bold leading-snug mb-2" style={{ color: "#fff" }}>
              Tu música,<br />protegida.
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Cancelaciones flexibles para que reserves con tranquilidad.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
            style={{ color: "var(--color-on-surface-muted)", backgroundColor: "var(--color-surface-elevated)" }}
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--color-on-surface)" }}>
            Políticas de cancelación
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-muted)" }}>
            {booking.eventName} · {booking.musicianName}
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ backgroundColor: "var(--color-surface-elevated)" }}>
              <span className="text-base mt-0.5 shrink-0">✅</span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-on-surface)" }}>+7 días de anticipación</p>
                <p className="text-sm" style={{ color: "var(--color-on-surface-muted)" }}>Devolución del <strong style={{ color: "var(--color-on-surface)" }}>100%</strong> del valor pagado.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ backgroundColor: "var(--color-surface-elevated)" }}>
              <span className="text-base mt-0.5 shrink-0">⚠️</span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-on-surface)" }}>Menos de 7 días</p>
                <p className="text-sm" style={{ color: "var(--color-on-surface-muted)" }}>Penalización del 40%, devolución del <strong style={{ color: "var(--color-on-surface)" }}>60%</strong>.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ backgroundColor: "var(--color-surface-elevated)" }}>
              <span className="text-base mt-0.5 shrink-0">🎵</span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-on-surface)" }}>Si cancela el músico</p>
                <p className="text-sm" style={{ color: "var(--color-on-surface-muted)" }}>Devolución del <strong style={{ color: "var(--color-on-surface)" }}>100%</strong> garantizada.</p>
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-6"
            style={{ backgroundColor: fullRefund ? "rgba(0,197,116,0.12)" : "rgba(190,31,58,0.1)" }}
          >
            <span className="text-lg">{fullRefund ? "✅" : "⚠️"}</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: fullRefund ? "#00C574" : "#BE1F3A" }}>
                Tu devolución: {formatCOP(booking.price * refundPct / 100)} ({refundPct}%)
              </p>
              <p className="text-xs" style={{ color: "var(--color-on-surface-muted)" }}>
                {fullRefund ? "Faltan más de 7 días para el evento." : "Faltan menos de 7 días para el evento."}
              </p>
            </div>
          </div>

          <button
            onClick={onConfirm}
            className="w-full py-3.5 rounded-full text-sm font-semibold mb-3 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#BE1F3A", color: "#fff" }}
          >
            Confirmar cancelación
          </button>
          <button
            onClick={onClose}
            className="w-full text-sm py-2 transition-opacity hover:opacity-70"
            style={{ color: "var(--color-on-surface-muted)" }}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          style={{ fontSize: 36, lineHeight: 1, color: n <= (hovered || value) ? "#F5A623" : "var(--color-surface-elevated)", transition: "color 0.1s", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewModal({ booking, onClose, onDone }: {
  booking: Booking; onClose: () => void; onDone: () => void;
}) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const handleSubmit = () => {
    const name = user?.name ?? "Anónimo";
    const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
    saveReview({
      id: `rev-${Date.now()}`,
      bookingId: booking.id,
      musicianId: booking.musicianId,
      buyerName: name,
      buyerInitials: initials,
      rating,
      text,
      date: new Date().toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" }),
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl rounded-2xl flex" style={{ backgroundColor: "var(--color-surface)", minHeight: "480px", overflow: "hidden" }}>
        {/* Left panel */}
        <div className="hidden md:flex relative w-2/5 shrink-0 flex-col justify-end p-8">
          <Image src={booking.musicianPhoto} alt={booking.musicianName} fill className="object-cover object-center" sizes="320px" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,13,31,0.95) 0%, rgba(47,82,223,0.3) 60%, transparent 100%)" }} />
          <div className="relative z-10">
            <p className="text-2xl font-bold leading-snug mb-1" style={{ color: "#fff" }}>{booking.musicianName}</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{booking.eventName}</p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-muted)", backgroundColor: "var(--color-surface-elevated)" }}>×</button>

          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-on-surface)" }}>¿Cómo fue el show?</h2>
              <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-muted)" }}>Califica cómo fue tu evento con la banda.</p>

              <div className="mb-6">
                <StarPicker value={rating} onChange={setRating} />
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium" style={{ color: "var(--color-on-surface-muted)" }}>Haz una reseña <span style={{ fontWeight: 400 }}>(opcional)</span></label>
                  <span className="text-xs" style={{ color: wordCount > 120 ? "#BE1F3A" : "var(--color-on-surface-muted)" }}>{wordCount}/120 palabras</span>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => {
                    const words = e.target.value.trim() === "" ? [] : e.target.value.trim().split(/\s+/);
                    if (words.length <= 120) setText(e.target.value);
                  }}
                  placeholder="Cuéntales a otros compradores cómo fue tu experiencia…"
                  rows={4}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                  style={{ backgroundColor: "var(--color-surface-elevated)", color: "var(--color-on-surface)" }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className="w-full py-3.5 rounded-full text-sm font-semibold mb-3 transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
              >
                Siguiente
              </button>
              <button onClick={onClose} className="w-full text-sm py-2 transition-opacity hover:opacity-70" style={{ color: "var(--color-on-surface-muted)" }}>
                Saltar por ahora
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="text-5xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--color-on-surface)" }}>¡Tu calificación<br />ha sido enviada!</h2>
              <p className="text-sm mb-10" style={{ color: "var(--color-on-surface-muted)" }}>Gracias por compartir tu experiencia con la comunidad Jukjam.</p>
              <Link
                href="/shows"
                onClick={onDone}
                className="inline-block w-full py-3.5 rounded-full text-sm font-semibold text-center"
                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
              >
                Explorar artistas
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EventCard({ booking, onCancel, onReview, reviewed }: { booking: Booking; onCancel: () => void; onReview: () => void; reviewed: boolean }) {
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
        {booking.status === "completado" && (
          reviewed
            ? <span style={{ fontSize: 12, color: "#00C574" }}>✓ Reseñado</span>
            : <button onClick={onReview} style={{ fontSize: 12, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(47,82,223,0.5)", color: "var(--color-primary)", backgroundColor: "transparent", cursor: "pointer" }}>Calificar</button>
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
  const [reviewTarget, setReviewTarget] = useState<Booking | null>(null);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const [followedIds, setFollowedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) { router.replace("/"); return; }
    seedMockBookings();
    setBookings(getBookings());
    setFollowedIds(JSON.parse(localStorage.getItem("jukjam_following") ?? "[]"));
    setReviewedIds(new Set(getReviews().map((r) => r.bookingId)));
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
          <div className="flex gap-1 mb-8 p-1.5 rounded-2xl w-fit" style={{ backgroundColor: "var(--color-surface)" }}>
            {([{ key: "eventos", label: "Mis Eventos" }, { key: "seguidos", label: "Seguidos" }] as { key: Section; label: string }[]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSection(key)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  backgroundColor: section === key ? "var(--color-primary)" : "transparent",
                  color: section === key ? "var(--color-on-primary)" : "var(--color-on-surface-muted)",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Eventos */}
          {section === "eventos" && (
            <div>
              <div className="flex gap-1 mb-6 p-1.5 rounded-2xl w-fit" style={{ backgroundColor: "var(--color-surface)" }}>
                {EVENT_TABS.map(({ key, label }) => {
                  const TAB_COLORS: Record<BookingStatus, { active: string; text: string }> = {
                    pendiente:  { active: "var(--color-primary)", text: "var(--color-on-primary)" },
                    completado: { active: "#00C574",              text: "#0B0D1F"                 },
                    cancelado:  { active: "#BE1F3A",              text: "#fff"                    },
                  };
                  const tc = TAB_COLORS[key];
                  const count = bookings.filter((b) => b.status === key).length;
                  return (
                    <button
                      key={key}
                      onClick={() => setEventTab(key)}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5"
                      style={{
                        backgroundColor: eventTab === key ? tc.active : "transparent",
                        color: eventTab === key ? tc.text : "var(--color-on-surface-muted)",
                      }}
                    >
                      {label}
                      {count > 0 && (
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                          style={{
                            backgroundColor: eventTab === key ? "rgba(0,0,0,0.2)" : tc.active,
                            color: eventTab === key ? tc.text : tc.text,
                          }}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {filtered.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {filtered.map((b) => (
                    <EventCard key={b.id} booking={b} onCancel={() => setCancelTarget(b)} onReview={() => setReviewTarget(b)} reviewed={reviewedIds.has(b.id)} />
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
      {reviewTarget && (
        <ReviewModal
          booking={reviewTarget}
          onClose={() => setReviewTarget(null)}
          onDone={() => {
            setReviewedIds(new Set(getReviews().map((r) => r.bookingId)));
            setReviewTarget(null);
          }}
        />
      )}
    </>
  );
}
