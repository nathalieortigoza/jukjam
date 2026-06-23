"use client";

import { useState } from "react";

interface MusicianModalProps {
  onClose: () => void;
}

export default function MusicianModal({ onClose }: MusicianModalProps) {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    nombreProyecto: "",
    descripcion: "",
    portafolio: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Email sending will connect to API route in next iteration
    setSubmitted(true);
  };

  const inputStyle = {
    backgroundColor: "var(--color-surface-elevated)",
    color: "var(--color-on-surface)",
    border: "none",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-xl p-8 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl leading-none"
          style={{ color: "var(--color-on-surface-muted)" }}
        >
          ×
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎵</div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-on-surface)" }}>
              ¡Gracias!
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-muted)" }}>
              Revisaremos tu portafolio y estaremos contactándonos contigo dentro de los siguientes 10 días hábiles.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-3 rounded-full font-semibold text-sm"
              style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-on-surface)" }}>
              Inscríbete como músico
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-muted)" }}>
              Haz parte de nuestro grupo pionero. Todos los campos son obligatorios.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1" style={{ color: "var(--color-on-surface-muted)" }}>
                    Nombre
                  </label>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder="María"
                    className="w-full rounded-md px-4 py-3 text-sm outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1" style={{ color: "var(--color-on-surface-muted)" }}>
                    Apellidos
                  </label>
                  <input
                    name="apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                    required
                    placeholder="García"
                    className="w-full rounded-md px-4 py-3 text-sm outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1" style={{ color: "var(--color-on-surface-muted)" }}>
                  Correo electrónico
                </label>
                <input
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={handleChange}
                  required
                  placeholder="tu@correo.com"
                  className="w-full rounded-md px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-xs mb-1" style={{ color: "var(--color-on-surface-muted)" }}>
                  Nombre del proyecto musical
                </label>
                <input
                  name="nombreProyecto"
                  value={form.nombreProyecto}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Trío Jazz Bogotá"
                  className="w-full rounded-md px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-xs mb-1" style={{ color: "var(--color-on-surface-muted)" }}>
                  Descripción del proyecto
                </label>
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Cuéntanos sobre tu propuesta musical..."
                  className="w-full rounded-md px-4 py-3 text-sm outline-none resize-none"
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block text-xs mb-1" style={{ color: "var(--color-on-surface-muted)" }}>
                  Link del portafolio
                </label>
                <input
                  name="portafolio"
                  type="url"
                  value={form.portafolio}
                  onChange={handleChange}
                  required
                  placeholder="https://youtube.com/..."
                  className="w-full rounded-md px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full font-semibold text-sm mt-2"
                style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
              >
                Enviar postulación
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
