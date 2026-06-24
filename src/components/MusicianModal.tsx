"use client";

import { useState } from "react";
import Image from "next/image";

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

const GENRES = [
  "Jazz", "Folk", "Música de autor", "Rock acústico",
  "Salsa", "Tango-pop", "Jazz fusión", "Música romántica", "Blues", "Boleros",
];

const inputStyle = {
  backgroundColor: "var(--color-surface-elevated)",
  color: "var(--color-on-surface)",
};

interface MusicianModalProps {
  onClose: () => void;
}

export default function MusicianModal({ onClose }: MusicianModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 — personal
  const [nombre, setNombre]           = useState("");
  const [apellidos, setApellidos]     = useState("");
  const [correo, setCorreo]           = useState("");
  const [countryCode, setCountryCode] = useState("+57");
  const [celular, setCelular]         = useState("");

  // Step 2 — project
  const [proyecto, setProyecto]       = useState("");
  const [generos, setGeneros]         = useState<string[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [portafolio, setPortafolio]   = useState("");

  const toggleGenre = (g: string) =>
    setGeneros((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);

  const step1Valid = nombre && apellidos && correo && celular;
  const step2Valid = proyecto && generos.length > 0 && descripcion && portafolio;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API route will send email to Jukjam team in next iteration
    setStep(3);
  };

  const LEFT_COPY = [
    { heading: "Toca en los mejores\neventos de Bogotá.", sub: "Únete al primer marketplace de músicos alternativos en Colombia." },
    { heading: "Cuéntanos sobre\ntu música.", sub: "Escoge los géneros que mejor describen tu propuesta." },
    { heading: null, sub: null },
  ][step - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-3xl rounded-2xl flex"
        style={{ backgroundColor: "var(--color-surface)", minHeight: "540px", overflow: "hidden" }}
      >
        {/* Left panel */}
        <div className="hidden md:flex relative w-2/5 shrink-0 flex-col justify-end p-8">
          <Image
            src="/auth-collage.png"
            alt="Músicos Jukjam"
            fill
            className="object-cover object-left"
            sizes="320px"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(11,13,31,0.95) 0%, rgba(47,82,223,0.35) 60%, rgba(190,31,58,0.2) 100%)" }}
          />
          {LEFT_COPY.heading && (
            <div className="relative z-10">
              <p className="text-2xl font-bold leading-snug mb-2" style={{ color: "#fff", whiteSpace: "pre-line" }}>
                {LEFT_COPY.heading}
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{LEFT_COPY.sub}</p>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
            style={{ color: "var(--color-on-surface-muted)", backgroundColor: "var(--color-surface-elevated)" }}
          >
            ×
          </button>

          {/* Step indicators */}
          {step < 3 && (
            <div className="flex items-center gap-2 mb-8">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: step === s ? 24 : 8,
                    backgroundColor: step >= s ? "var(--color-primary)" : "var(--color-surface-elevated)",
                  }}
                />
              ))}
            </div>
          )}

          {/* Step 1 — personal info */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--color-on-surface)" }}>Regístrate como músico</h2>
              <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-muted)" }}>Haz parte de nuestro grupo pionero.</p>

              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-on-surface-muted)" }}>Nombre</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="María" className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-on-surface-muted)" }}>Apellidos</label>
                    <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required placeholder="García" className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-on-surface-muted)" }}>Correo electrónico</label>
                  <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" placeholder="tu@correo.com" className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={inputStyle} />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-on-surface-muted)" }}>Celular</label>
                  <div className="flex gap-2">
                    <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="rounded-xl px-3 py-3 text-sm outline-none" style={inputStyle}>
                      {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
                    </select>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={celular}
                      onChange={(e) => setCelular(e.target.value.replace(/\D/g, "").slice(0, 10))} maxLength={10}
                      required
                      placeholder="3001234567"
                      className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!step1Valid}
                  className="w-full py-3 rounded-full font-semibold text-sm mt-2 transition-opacity hover:opacity-90 disabled:opacity-40"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                >
                  Continuar
                </button>
              </form>
            </>
          )}

          {/* Step 2 — project */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--color-on-surface)" }}>Tu proyecto musical</h2>
              <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-muted)" }}>Cuéntanos sobre tu propuesta artística.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-on-surface-muted)" }}>Nombre del proyecto</label>
                  <input type="text" value={proyecto} onChange={(e) => setProyecto(e.target.value)} required placeholder="Ej. Trío Jazz Bogotá" className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={inputStyle} />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-3" style={{ color: "var(--color-on-surface-muted)" }}>Géneros <span className="font-normal">(selecciona al menos uno)</span></label>
                  <div className="flex flex-wrap gap-2">
                    {GENRES.map((g) => {
                      const active = generos.includes(g);
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => toggleGenre(g)}
                          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                          style={{
                            backgroundColor: active ? "var(--color-primary)" : "var(--color-surface-elevated)",
                            color: active ? "var(--color-on-primary)" : "var(--color-on-surface-muted)",
                          }}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-on-surface-muted)" }}>Descripción del proyecto</label>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                    rows={3}
                    placeholder="Cuéntanos sobre tu propuesta musical y los tipos de evento en los que tocas…"
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-on-surface-muted)" }}>Link del portafolio</label>
                  <input type="url" value={portafolio} onChange={(e) => setPortafolio(e.target.value)} required placeholder="https://youtube.com/..." className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={inputStyle} />
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-full text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ backgroundColor: "var(--color-surface-elevated)", color: "var(--color-on-surface-muted)" }}
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    disabled={!step2Valid}
                    className="flex-1 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
                    style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  >
                    Enviar postulación
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Step 3 — confirmation */}
          {step === 3 && (
            <div className="text-center">
              <div className="text-5xl mb-6">🎵</div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--color-on-surface)" }}>¡Tu postulación<br />fue enviada!</h2>
              <p className="text-sm leading-relaxed mb-10" style={{ color: "var(--color-on-surface-muted)" }}>
                Revisaremos tu portafolio y te contactaremos dentro de los siguientes <strong style={{ color: "var(--color-on-surface)" }}>10 días hábiles</strong>.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
