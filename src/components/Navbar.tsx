"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginModal from "./LoginModal";
import MusicianModal from "./MusicianModal";

export default function Navbar() {
  const [modal, setModal] = useState<"login" | "register" | "musician" | null>(null);

  return (
    <>
      <nav
        className="sticky top-0 z-40 w-full"
        style={{ backgroundColor: "var(--color-surface)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-jukjam.png"
              alt="Jukjam"
              width={120}
              height={36}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/shows"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--color-on-surface-muted)" }}
            >
              Shows
            </Link>
            <a
              href="#sobre-nosotros"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--color-on-surface-muted)" }}
            >
              Sobre nosotros
            </a>
            <a
              href="#contacto"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--color-on-surface-muted)" }}
            >
              Contacto
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModal("login")}
              className="text-sm font-medium px-4 py-2 rounded-full border transition-colors hover:opacity-80"
              style={{
                color: "var(--color-on-surface)",
                borderColor: "rgba(255,255,255,0.2)",
              }}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setModal("musician")}
              className="text-sm font-semibold px-4 py-2 rounded-full transition-colors hover:opacity-90"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
              }}
            >
              Inscríbete como músico
            </button>
          </div>
        </div>
      </nav>

      {modal === "login" && (
        <LoginModal
          onClose={() => setModal(null)}
          onSwitchToRegister={() => setModal("register")}
        />
      )}
      {modal === "register" && (
        <LoginModal
          onClose={() => setModal(null)}
          onSwitchToRegister={() => setModal("register")}
        />
      )}
      {modal === "musician" && (
        <MusicianModal onClose={() => setModal(null)} />
      )}
    </>
  );
}
