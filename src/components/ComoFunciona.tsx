"use client";

import Image from "next/image";
import Link from "next/link";

const STEPS = [
  {
    num: "01",
    icon: "/icons/calendar.png",
    text: "Elige el género, la fecha y la hora del evento.",
    accent: "var(--color-primary)",
  },
  {
    num: "02",
    icon: "/icons/money.png",
    text: "Confirma los datos y haz el pago.",
    accent: "var(--color-primary)",
  },
  {
    num: "03",
    icon: "/icons/party.png",
    text: "Disfruta el evento con tu gente.",
    accent: "var(--color-brand-warm)",
  },
];

export default function ComoFunciona() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-background)",
        padding: "80px 32px 72px",
        fontFamily: "var(--font-inter), Inter, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Título estilo hero */}
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-on-surface-muted)", marginBottom: 16, textAlign: "center" }}>
          Guía rápida
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 56,
            textAlign: "center",
            color: "var(--color-on-background)",
          }}
        >
          ¿Cómo{" "}
          <span style={{ color: "var(--color-primary)" }}>funciona?</span>
        </h2>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{
                position: "relative",
                borderRadius: 16,
                padding: "32px 28px 28px",
                backgroundColor: "var(--color-surface)",
                borderTop: `3px solid ${step.accent}`,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                minHeight: 220,
              }}
            >
              {/* Arrow between cards */}
              {i < STEPS.length - 1 && (
                <div style={{ position: "absolute", right: -22, top: "50%", transform: "translateY(-50%)", zIndex: 2, color: "var(--color-on-surface-muted)", fontSize: 20 }}>
                  →
                </div>
              )}

              <span style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, color: step.accent, opacity: 0.25 }}>
                {step.num}
              </span>

              <Image src={step.icon} alt="" width={28} height={28} style={{ objectFit: "contain" }} />

              <p style={{ fontSize: 15, lineHeight: 1.5, color: "var(--color-on-surface)", margin: 0 }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p style={{ fontSize: 13, color: "var(--color-on-surface-muted)", marginBottom: 24, textAlign: "center" }}>
          Proceso 100% en línea &nbsp;·&nbsp; Sin filas &nbsp;·&nbsp; Sin complicaciones
        </p>

        {/* Cancellation note */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 20px", borderRadius: 12, backgroundColor: "var(--color-surface)", borderLeft: "3px solid var(--color-brand-warm)", maxWidth: 480, margin: "0 auto" }}>
          <Image src="/icons/info.png" alt="" width={18} height={18} style={{ objectFit: "contain", flexShrink: 0, marginTop: 1, opacity: 0.7 }} />
          <p style={{ fontSize: 13, color: "var(--color-on-surface-muted)", margin: 0, lineHeight: 1.5 }}>
            ¿Tuviste que cancelar?{" "}
            <Link href="/tablero" style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "underline" }}>
              Revisa nuestra política de cancelación.
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}
