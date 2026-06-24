"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
export default function Navbar() {
  const { user, logout } = useAuth();
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user
    ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "";

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
            <Link href="/shows" className="text-sm font-medium transition-opacity hover:opacity-80" style={{ color: "var(--color-on-surface-muted)" }}>
              Shows
            </Link>
            <a href="/#sobre-nosotros" className="text-sm font-medium transition-opacity hover:opacity-80" style={{ color: "var(--color-on-surface-muted)" }}>
              Sobre nosotros
            </a>
            <a href="/#contacto" className="text-sm font-medium transition-opacity hover:opacity-80" style={{ color: "var(--color-on-surface-muted)" }}>
              Contacto
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              /* Logged in */
              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "var(--color-surface-elevated)" }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  >
                    {initials}
                  </div>
                  <span className="text-sm font-medium hidden sm:block" style={{ color: "var(--color-on-surface)" }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <svg className={`w-3.5 h-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: "var(--color-on-surface-muted)" }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {menuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden shadow-lg py-1"
                    style={{ backgroundColor: "var(--color-surface-elevated)" }}
                  >
                    <Link
                      href="/tablero"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm transition-opacity hover:opacity-80"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      Mis eventos
                    </Link>
                    <button
                      onClick={() => { logout(); setMenuOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm transition-opacity hover:opacity-80"
                      style={{ color: "var(--color-on-surface-muted)" }}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged out */
              <>
                <button
                  onClick={() => setModal("login")}
                  className="text-sm font-medium px-4 py-2 rounded-full border transition-opacity hover:opacity-80"
                  style={{ color: "var(--color-on-surface)", borderColor: "rgba(255,255,255,0.2)" }}
                >
                  Ingresa
                </button>
                <button
                  onClick={() => setModal("register")}
                  className="text-sm font-medium px-4 py-2 rounded-full border transition-opacity hover:opacity-80 hidden sm:block"
                  style={{ color: "var(--color-on-surface)", borderColor: "rgba(255,255,255,0.2)" }}
                >
                  Crear cuenta
                </button>
                <Link
                  href="/registrate-musico"
                  className="text-sm font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                >
                  Regístrate como músico
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {modal === "login" && (
        <LoginModal onClose={() => setModal(null)} onSwitchToRegister={() => setModal("register")} />
      )}
      {modal === "register" && (
        <RegisterModal onClose={() => setModal(null)} onSwitchToLogin={() => setModal("login")} />
      )}
    </>
  );
}
