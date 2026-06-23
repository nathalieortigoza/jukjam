"use client";

import { useState } from "react";

const COUNTRY_CODES = [
  { code: "+57", label: "🇨🇴 +57", country: "Colombia" },
  { code: "+52", label: "🇲🇽 +52", country: "México" },
  { code: "+54", label: "🇦🇷 +54", country: "Argentina" },
  { code: "+34", label: "🇪🇸 +34", country: "España" },
  { code: "+1", label: "🇺🇸 +1", country: "EE.UU." },
  { code: "+55", label: "🇧🇷 +55", country: "Brasil" },
  { code: "+56", label: "🇨🇱 +56", country: "Chile" },
  { code: "+51", label: "🇵🇪 +51", country: "Perú" },
  { code: "+593", label: "🇪🇨 +593", country: "Ecuador" },
  { code: "+58", label: "🇻🇪 +58", country: "Venezuela" },
  { code: "+44", label: "🇬🇧 +44", country: "Reino Unido" },
  { code: "+33", label: "🇫🇷 +33", country: "Francia" },
  { code: "+49", label: "🇩🇪 +49", country: "Alemania" },
  { code: "+39", label: "🇮🇹 +39", country: "Italia" },
  { code: "+81", label: "🇯🇵 +81", country: "Japón" },
];

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({ onClose, onSwitchToRegister }: LoginModalProps) {
  const [countryCode, setCountryCode] = useState("+57");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // OTP validation will connect to Twilio in P1
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-xl p-8"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl leading-none"
          style={{ color: "var(--color-on-surface-muted)" }}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-on-surface)" }}>
          Iniciar sesión
        </h2>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: "var(--color-on-surface-muted)" }}>
                Número de celular
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="rounded-md px-3 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: "var(--color-surface-elevated)",
                    color: "var(--color-on-surface)",
                    border: "none",
                  }}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="3001234567"
                  required
                  className="flex-1 rounded-md px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: "var(--color-surface-elevated)",
                    color: "var(--color-on-surface)",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-sm"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
              }}
            >
              Enviar código por WhatsApp
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <p className="text-sm" style={{ color: "var(--color-on-surface-muted)" }}>
              Ingresa el código de 6 dígitos que enviamos a {countryCode} {phone}
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              required
              maxLength={6}
              className="w-full rounded-md px-4 py-3 text-center text-2xl tracking-widest font-bold outline-none"
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                color: "var(--color-on-surface)",
              }}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-sm"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
              }}
            >
              Confirmar
            </button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full text-sm"
              style={{ color: "var(--color-on-surface-muted)" }}
            >
              Reenviar código
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-center" style={{ color: "var(--color-on-surface-muted)" }}>
          ¿No tenés cuenta?{" "}
          <button
            onClick={onSwitchToRegister}
            className="font-semibold underline"
            style={{ color: "var(--color-primary)" }}
          >
            Crea tu cuenta
          </button>
        </p>
      </div>
    </div>
  );
}
