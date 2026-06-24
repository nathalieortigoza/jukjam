"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const COUNTRY_CODES = [
  { code: "+57", label: "🇨🇴 +57" },
  { code: "+52", label: "🇲🇽 +52" },
  { code: "+54", label: "🇦🇷 +54" },
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+1",  label: "🇺🇸 +1"  },
  { code: "+55", label: "🇧🇷 +55" },
  { code: "+56", label: "🇨🇱 +56" },
  { code: "+51", label: "🇵🇪 +51" },
  { code: "+44", label: "🇬🇧 +44" },
];

const fieldStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "var(--color-surface)",
  color: "var(--color-on-surface)",
  border: "none",
  borderRadius: 12,
  padding: "12px 16px",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: "block", fontSize: 12, fontWeight: 500, marginBottom: 8, color: "var(--color-on-surface-muted)" }}>
      {children}
    </label>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>;
}

function ThanksModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} onClick={onClose} />
      <div style={{ position: "relative", width: "100%", maxWidth: 360, borderRadius: 24, padding: "40px 32px", textAlign: "center", backgroundColor: "var(--color-surface)" }}>
        <Image src="/icons/sing.png" alt="" width={72} height={72} style={{ objectFit: "contain", marginBottom: 20 }} />
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "var(--color-on-surface)" }}>¡Tu postulación<br />fue enviada!</h2>
        <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 32, color: "var(--color-on-surface-muted)" }}>
          Revisaremos tu información y nos comunicaremos contigo dentro de los siguientes{" "}
          <strong style={{ color: "var(--color-on-surface)" }}>10 días hábiles</strong>.
        </p>
        <Link href="/" style={{ display: "block", width: "100%", padding: "14px 0", borderRadius: 999, fontSize: 14, fontWeight: 600, textAlign: "center", backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", textDecoration: "none" }}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default function RegistrateMusico() {
  const [countryCode, setCountryCode] = useState("+57");
  const [nombre, setNombre]           = useState("");
  const [telefono, setTelefono]       = useState("");
  const [correo, setCorreo]           = useState("");
  const [proyecto, setProyecto]       = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [instagram, setInstagram]     = useState("");
  const [youtube, setYoutube]         = useState("");
  const [spotify, setSpotify]         = useState("");
  const [web, setWeb]                 = useState("");
  const [tiktok, setTiktok]           = useState("");
  const [submitted, setSubmitted]     = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", backgroundColor: "var(--color-background)", paddingTop: 80 }}>

        {/* Hero */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 32px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-on-surface-muted)", textDecoration: "none", marginBottom: 24 }}>
              <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Volver
            </Link>
            <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: "var(--color-on-background)" }}>
              Regístrate<br />como músico
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-on-surface-muted)", maxWidth: 420 }}>
              Haz parte del primer marketplace de músicos alternativos en Colombia. Toca en los mejores eventos de Bogotá sin preocuparte por el mercadeo.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src="/gramophone.png" alt="Jukjam músicos" width={300} height={300} style={{ objectFit: "contain" }} />
          </div>
        </section>

        {/* Form + sidebar */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 80px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, alignItems: "start" }}>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            <Field>
              <Label>Nombre completo</Label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="María García" style={fieldStyle} />
            </Field>

            <Field>
              <Label>Teléfono</Label>
              <div style={{ display: "flex", gap: 8 }}>
                <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} style={{ ...fieldStyle, width: "auto" }}>
                  {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
                </select>
                <input type="tel" inputMode="numeric" value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/\D/g, "").slice(0, 10))} required maxLength={10} placeholder="3001234567" style={{ ...fieldStyle, flex: 1 }} />
              </div>
            </Field>

            <Field>
              <Label>Correo electrónico</Label>
              <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" placeholder="tu@correo.com" style={fieldStyle} />
            </Field>

            <Field>
              <Label>Nombre del proyecto musical *</Label>
              <input type="text" value={proyecto} onChange={(e) => setProyecto(e.target.value)} required placeholder="Ej. Trío Jazz Bogotá" style={fieldStyle} />
            </Field>

            <Field>
              <Label>Descripción del proyecto *</Label>
              <p style={{ fontSize: 12, color: "var(--color-on-surface-muted)", marginBottom: 8, lineHeight: 1.5 }}>
                Describe tu propuesta de valor y los tipos de shows que ofreces — géneros, formato (solista, dúo, banda), tamaño de evento, etc.
              </p>
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required rows={5} placeholder="Somos un trío de jazz fusión con más de 8 años en escena. Tocamos en eventos corporativos, bodas y espacios íntimos…" style={{ ...fieldStyle, resize: "none" }} />
            </Field>

            <Field>
              <Label>Instagram *</Label>
              <input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} required placeholder="https://instagram.com/tu_proyecto" style={fieldStyle} />
            </Field>

            <Field>
              <Label>YouTube</Label>
              <input type="url" value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="https://youtube.com/@tu_proyecto" style={fieldStyle} />
            </Field>

            <Field>
              <Label>Spotify</Label>
              <input type="url" value={spotify} onChange={(e) => setSpotify(e.target.value)} placeholder="https://open.spotify.com/artist/..." style={fieldStyle} />
            </Field>

            <Field>
              <Label>Página web</Label>
              <input type="url" value={web} onChange={(e) => setWeb(e.target.value)} placeholder="https://tuproyecto.com" style={fieldStyle} />
            </Field>

            <Field>
              <Label>TikTok</Label>
              <input type="url" value={tiktok} onChange={(e) => setTiktok(e.target.value)} placeholder="https://tiktok.com/@tu_proyecto" style={fieldStyle} />
            </Field>

            <button type="submit" style={{ width: "100%", padding: "16px 0", borderRadius: 999, fontSize: 15, fontWeight: 700, backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", border: "none", cursor: "pointer" }}>
              Enviar postulación
            </button>
          </form>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ backgroundColor: "var(--color-surface)", borderRadius: 16, padding: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-on-surface-muted)", marginBottom: 16 }}>¿Por qué Jukjam?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "/icons/sing.png",   text: "Recibe contratos sin hacer mercadeo" },
                  { icon: "/icons/money.png",  text: "Precios fijos — sin regateos ni malentendidos" },
                  { icon: "/icons/bell.png",   text: "Pago garantizado al confirmar el show con tu código" },
                  { icon: "/icons/info.png",   text: "Comisión del 10% solo al completar el servicio" },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <Image src={icon} alt="" width={24} height={24} style={{ objectFit: "contain", flexShrink: 0, marginTop: 1 }} />
                    <p style={{ fontSize: 13, lineHeight: 1.5, color: "var(--color-on-surface-muted)" }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: "var(--color-surface)", borderRadius: 16, padding: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-on-surface-muted)", marginBottom: 12 }}>¿Tienes preguntas?</p>
              <a href="mailto:hola@jukjam.co" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--color-primary)", textDecoration: "none" }}>
                <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                hola@jukjam.co
              </a>
            </div>
          </div>

        </section>
      </main>

      <Footer />
      {submitted && <ThanksModal onClose={() => setSubmitted(false)} />}
    </>
  );
}
