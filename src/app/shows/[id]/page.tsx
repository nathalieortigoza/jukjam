"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import { useAuth } from "@/context/AuthContext";
import { MUSICIANS, formatCOP, ShowPackage } from "@/data/musicians";

function CancellationModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-2xl p-8"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl leading-none"
          style={{ color: "var(--color-on-surface-muted)" }}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-on-surface)" }}>
          Políticas de cancelación
        </h2>
        <ul className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--color-on-surface-muted)" }}>
          <li className="flex gap-3">
            <span className="mt-0.5 shrink-0 text-base">✅</span>
            <span>Si cancelas con más de 7 días de anticipación: te devolvemos el <strong style={{ color: "var(--color-on-surface)" }}>100%</strong> del valor pagado.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-0.5 shrink-0 text-base">⚠️</span>
            <span>Si cancelas con menos de 7 días de anticipación: se aplica una penalización del 40%, por lo que se te devuelve el <strong style={{ color: "var(--color-on-surface)" }}>60%</strong> del valor pagado.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-0.5 shrink-0 text-base">🎵</span>
            <span>Si el músico cancela el show: te devolvemos el <strong style={{ color: "var(--color-on-surface)" }}>100%</strong> del valor pagado.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function PackageCard({ pkg, onBook }: { pkg: ShowPackage; onBook: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const SHORT = 120;
  const isLong = pkg.description.length > SHORT;

  return (
    <div
      className="rounded-2xl p-6"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-1">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-on-surface)" }}>
          {pkg.name}
        </h3>
        <span className="text-xs shrink-0 px-3 py-1 rounded-full" style={{ backgroundColor: "var(--color-surface-elevated)", color: "var(--color-on-surface-muted)" }}>
          {pkg.duration}
        </span>
      </div>

      <p className="text-xl font-bold mb-3" style={{ color: "var(--color-on-surface)" }}>
        {formatCOP(pkg.price)}
      </p>

      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-on-surface-muted)" }}>
        {expanded || !isLong ? pkg.description : pkg.description.slice(0, SHORT) + "…"}
        {isLong && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="ml-1 underline text-xs"
            style={{ color: "var(--color-primary)" }}
          >
            {expanded ? "ver menos" : "ver más"}
          </button>
        )}
      </p>

      <button
        onClick={onBook}
        className="w-full py-2.5 rounded-full text-sm font-semibold"
        style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
      >
        Reserva ahora
      </button>
    </div>
  );
}

export default function MusicianProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const musician = MUSICIANS.find((m) => m.id === id);
  if (!musician) notFound();

  const { user } = useAuth();
  const router = useRouter();
  const [activePhoto, setActivePhoto] = useState(0);
  const [showCancellation, setShowCancellation] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [pendingPkgId, setPendingPkgId] = useState<string | null>(null);

  // After login, navigate to booking
  useEffect(() => {
    if (user && pendingPkgId) {
      router.push(`/reserva/${id}/${pendingPkgId}`);
      setPendingPkgId(null);
    }
  }, [user, pendingPkgId]);

  const handleBook = (pkgId: string) => {
    if (user) {
      router.push(`/reserva/${id}/${pkgId}`);
    } else {
      setPendingPkgId(pkgId);
      setAuthModal("login");
    }
  };

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen pt-24 pb-20"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8">

          {/* Back + header */}
          <div className="mb-8">
            <Link
              href="/shows"
              className="inline-flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-70"
              style={{ color: "var(--color-on-surface-muted)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver al catálogo
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold" style={{ color: "var(--color-on-background)" }}>
                  {musician.name}
                </h1>
                <p className="text-sm capitalize mt-1" style={{ color: "var(--color-on-surface-muted)" }}>
                  {musician.type === "grupo" ? "Grupo musical" : "Solista"} · {musician.city}
                </p>
              </div>

              {/* Stats + seguir */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold" style={{ color: "var(--color-on-surface)" }}>
                    ⭐ {musician.rating.toFixed(1)}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-on-surface-muted)" }}>Calificación</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold" style={{ color: "var(--color-on-surface)" }}>
                    {musician.showsCompleted}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-on-surface-muted)" }}>Shows en Jukjam</p>
                </div>
                <button
                  className="px-5 py-2 rounded-full text-sm font-semibold border transition-opacity hover:opacity-80"
                  style={{
                    borderColor: "var(--color-primary)",
                    color: "var(--color-primary)",
                    backgroundColor: "transparent",
                  }}
                >
                  Seguir
                </button>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <section className="mb-12">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-3">
              <Image
                src={musician.photos[activePhoto]}
                alt={`${musician.name} foto ${activePhoto + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
            <div className="flex gap-3">
              {musician.photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 transition-all"
                  style={{
                    outline: activePhoto === i ? "2px solid var(--color-primary)" : "2px solid transparent",
                    outlineOffset: "2px",
                  }}
                >
                  <Image
                    src={photo}
                    alt={`Miniatura ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Así sonamos */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-5" style={{ color: "var(--color-on-surface)" }}>
              Así sonamos
            </h2>

            {musician.youtubeUrl && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6">
                <iframe
                  src={musician.youtubeUrl}
                  title={`${musician.name} — video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}

            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-on-surface-muted)" }}>
                Setlist
              </p>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                {musician.setlist.map((song, i) => (
                  <li key={i} className="flex items-baseline gap-3 text-sm">
                    <span className="text-xs w-5 shrink-0 text-right" style={{ color: "var(--color-on-surface-muted)" }}>
                      {i + 1}.
                    </span>
                    <span style={{ color: "var(--color-on-surface)" }}>{song}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Paquetes */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-5" style={{ color: "var(--color-on-surface)" }}>
              Shows
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {musician.packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} onBook={() => handleBook(pkg.id)} />
              ))}
            </div>
          </section>

          {/* Descripción */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-on-surface)" }}>
              Descripción
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-muted)" }}>
              {musician.description}
            </p>
          </section>

          {/* Géneros */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-on-surface)" }}>
              Géneros
            </h2>
            <div className="flex flex-wrap gap-2">
              {musician.genres.map((g) => (
                <span
                  key={g}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-on-surface)",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>
          </section>

          {/* Comentarios */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-5" style={{ color: "var(--color-on-surface)" }}>
              Comentarios
            </h2>
            {musician.reviews.length === 0 ? (
              <p className="text-sm" style={{ color: "var(--color-on-surface-muted)" }}>
                Aún no hay reseñas. ¡Sé el primero en contratar a {musician.name}!
              </p>
            ) : (
              <div className="space-y-4">
                {musician.reviews.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-2xl p-5"
                    style={{ backgroundColor: "var(--color-surface)" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                      >
                        {r.buyerInitials}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>{r.buyerName}</p>
                        <p className="text-xs" style={{ color: "var(--color-on-surface-muted)" }}>{"⭐".repeat(r.rating)} · {r.date}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-muted)" }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Políticas */}
          <section>
            <button
              onClick={() => setShowCancellation(true)}
              className="flex items-center gap-2 text-sm underline transition-opacity hover:opacity-70"
              style={{ color: "var(--color-on-surface-muted)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
              </svg>
              Políticas de cancelación
            </button>
          </section>

        </div>
      </main>

      {showCancellation && <CancellationModal onClose={() => setShowCancellation(false)} />}
      {authModal === "login" && (
        <LoginModal onClose={() => setAuthModal(null)} onSwitchToRegister={() => setAuthModal("register")} />
      )}
      {authModal === "register" && (
        <RegisterModal onClose={() => setAuthModal(null)} onSwitchToLogin={() => setAuthModal("login")} />
      )}
      <Footer />
    </>
  );
}
