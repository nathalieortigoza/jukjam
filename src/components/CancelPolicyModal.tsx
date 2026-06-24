"use client";

import Image from "next/image";

interface Props {
  onClose: () => void;
}

export default function CancelPolicyModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-3xl rounded-2xl flex"
        style={{ backgroundColor: "var(--color-surface)", minHeight: "480px", overflow: "hidden" }}
      >
        {/* Panel izquierdo */}
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

        {/* Panel derecho */}
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
            Conoce cómo funciona antes de reservar.
          </p>

          <div className="space-y-3 mb-8">
            {[
              { icon: "/icons/money.png",   title: "+7 días de anticipación",  desc: <>Devolución del <strong style={{ color: "var(--color-on-surface)" }}>100%</strong> del valor pagado.</> },
              { icon: "/icons/info.png",    title: "Menos de 7 días",           desc: <>Penalización del 40%, devolución del <strong style={{ color: "var(--color-on-surface)" }}>60%</strong>.</> },
              { icon: "/icons/sing.png",    title: "Si cancela el músico",      desc: <>Devolución del <strong style={{ color: "var(--color-on-surface)" }}>100%</strong> garantizada.</> },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-4 rounded-2xl" style={{ backgroundColor: "var(--color-surface-elevated)" }}>
                <Image src={icon} alt="" width={22} height={22} style={{ objectFit: "contain", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-on-surface)" }}>{title}</p>
                  <p className="text-sm" style={{ color: "var(--color-on-surface-muted)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
