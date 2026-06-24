"use client";

import { useState } from "react";
import Image from "next/image";
import CancelPolicyModal from "./CancelPolicyModal";

const STEPS = [
  {
    num: "01",
    icon: "/icons/calendar.png",
    text: "Elige el género, la fecha y la hora del evento.",
    color: "var(--color-primary)",
  },
  {
    num: "02",
    icon: "/icons/money.png",
    text: "Confirma los datos y haz el pago.",
    color: "#BE1F3A",
  },
  {
    num: "03",
    icon: "/icons/party.png",
    text: "Disfruta el evento con tu gente.",
    color: "#9B2DC4",
  },
];

export default function ComoFunciona() {
  const [showPolicy, setShowPolicy] = useState(false);

  return (
    <section
      style={{
        backgroundColor: "var(--color-background)",
        padding: "72px 32px 64px",
        fontFamily: "var(--font-quicksand), Quicksand, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Título */}
        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 56, textAlign: "center", color: "var(--color-on-background)" }}>
          ¿Cómo <span style={{ color: "var(--color-primary)" }}>funciona?</span>
        </h2>

        {/* Pasos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", alignItems: "start", gap: 0, marginBottom: 40 }}>
          {STEPS.map((step, i) => (
            <>
              {/* Paso */}
              <div key={step.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16, padding: "0 12px" }}>
                {/* Círculo con ícono */}
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-surface)",
                  border: `2px solid ${step.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Image src={step.icon} alt="" width={36} height={36} style={{ objectFit: "contain" }} />
                </div>

                {/* Número */}
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: step.color }}>
                  PASO {step.num}
                </span>

                {/* Texto */}
                <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.5, color: "var(--color-on-surface)", margin: 0 }}>
                  {step.text}
                </p>
              </div>

              {/* Flecha entre pasos */}
              {i < STEPS.length - 1 && (
                <div key={`arrow-${i}`} style={{ paddingTop: 36, color: "var(--color-on-surface-muted)", fontSize: 20, opacity: 0.4, flexShrink: 0 }}>
                  →
                </div>
              )}
            </>
          ))}
        </div>

        {/* Nota cancelación */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 24px", borderRadius: 999, backgroundColor: "var(--color-surface)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Image src="/icons/info.png" alt="" width={20} height={20} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--color-on-surface)", margin: 0 }}>
              ¿Tuviste que cancelar?{" "}
              <button
                onClick={() => setShowPolicy(true)}
                style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit", fontSize: 15 }}
              >
                Revisa nuestra política.
              </button>
            </p>
          </div>

          <p style={{ fontSize: 13, color: "var(--color-on-surface-muted)", margin: 0, letterSpacing: "0.04em" }}>
            Proceso fácil &nbsp;·&nbsp; En línea &nbsp;·&nbsp; Sin complicaciones
          </p>
        </div>

      </div>

      {showPolicy && <CancelPolicyModal onClose={() => setShowPolicy(false)} />}
    </section>
  );
}
