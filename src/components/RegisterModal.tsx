"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const COUNTRY_CODES = [
  { code: "+57", label: "🇨🇴 +57" },
  { code: "+52", label: "🇲🇽 +52" },
  { code: "+54", label: "🇦🇷 +54" },
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+1",  label: "🇺🇸 +1"  },
  { code: "+55", label: "🇧🇷 +55" },
  { code: "+56", label: "🇨🇱 +56" },
  { code: "+51", label: "🇵🇪 +51" },
  { code: "+593",label: "🇪🇨 +593"},
  { code: "+58", label: "🇻🇪 +58" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+39", label: "🇮🇹 +39" },
  { code: "+81", label: "🇯🇵 +81" },
];

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ onClose, onSwitchToLogin }: RegisterModalProps) {
  const { login } = useAuth();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [countryCode, setCountryCode] = useState("+57");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
    setCountdown(60);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ name: `${nombre} ${apellido}`, phone: `${countryCode} ${phone}` });
    onClose();
  };

  const inputStyle = {
    backgroundColor: "var(--color-surface-elevated)",
    color: "var(--color-on-surface)",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden flex"
        style={{ backgroundColor: "var(--color-surface)", minHeight: "520px" }}
      >
        {/* Left panel — image */}
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
            style={{
              background: "linear-gradient(to top, rgba(11,13,31,0.92) 0%, rgba(190,31,58,0.3) 55%, rgba(47,82,223,0.2) 100%)",
            }}
          />
          <div className="relative z-10">
            <p className="text-2xl font-bold leading-snug mb-2" style={{ color: "#fff" }}>
              Tu próximo show empieza aquí.
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Crea tu cuenta y reserva músicos en minutos.
            </p>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
            style={{ color: "var(--color-on-surface-muted)", backgroundColor: "var(--color-surface-elevated)" }}
          >
            ×
          </button>

          {step === "form" ? (
            <>
              <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--color-on-surface)" }}>
                Crear cuenta
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-muted)" }}>
                Únete a Jukjam y empieza a contratar música.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs mb-2 font-medium" style={{ color: "var(--color-on-surface-muted)" }}>Nombre</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="María"
                      required
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-2 font-medium" style={{ color: "var(--color-on-surface-muted)" }}>Apellido</label>
                    <input
                      type="text"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      placeholder="García"
                      required
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-2 font-medium" style={{ color: "var(--color-on-surface-muted)" }}>Celular</label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="rounded-xl px-3 py-3 text-sm outline-none"
                      style={inputStyle}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} maxLength={10}
                      placeholder="3001234567"
                      required
                      className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full font-semibold text-sm mt-2"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                >
                  Enviar código por WhatsApp
                </button>
              </form>

              <p className="mt-8 text-sm" style={{ color: "var(--color-on-surface-muted)" }}>
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={onSwitchToLogin}
                  className="font-semibold underline"
                  style={{ color: "var(--color-primary)" }}
                >
                  Ingresa
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-on-surface)" }}>
                Verifica tu número
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-muted)" }}>
                Ingresa el código de 6 dígitos que enviamos a{" "}
                <span style={{ color: "var(--color-on-surface)" }}>{countryCode} {phone}</span>
              </p>

              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  required
                  maxLength={6}
                  className="w-full rounded-xl px-4 py-4 text-center text-3xl tracking-[0.4em] font-bold outline-none"
                  style={inputStyle}
                />
                <button
                  type="submit"
                  disabled={otp.length < 6}
                  className="w-full py-3 rounded-full font-semibold text-sm disabled:opacity-40"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={handleFormSubmit as () => void}
                  disabled={countdown > 0}
                  className="w-full text-sm disabled:opacity-40"
                  style={{ color: "var(--color-on-surface-muted)" }}
                >
                  {countdown > 0 ? `Reenviar código en ${countdown}s` : "Reenviar código"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
