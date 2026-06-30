import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bg = "var(--color-background)";
const surface = "var(--color-surface)";
const surfaceEl = "var(--color-surface-elevated)";
const primary = "var(--color-primary)";
const warm = "var(--color-brand-warm)";
const onSurface = "var(--color-on-surface)";
const muted = "var(--color-on-surface-muted)";

// ── Componentes internos ──────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: primary, marginBottom: 12 }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.2, color: onSurface, marginBottom: 20 }}>
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 15, lineHeight: 1.7, color: muted, marginBottom: 16 }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.07)", margin: "64px 0" }} />;
}

// ── Página ────────────────────────────────────────────────────

export default function ArtistasPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: bg, paddingTop: 80 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 32px 100px" }}>

          {/* ── HERO ── */}
          <div style={{ marginBottom: 80, textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, backgroundColor: surface, marginBottom: 24 }}>
              <Image src="/icons/sing.png" alt="" width={16} height={16} style={{ objectFit: "contain" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: primary }}>Para artistas</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, color: onSurface, marginBottom: 20 }}>
              Bienvenido a Jukjam
            </h1>
            <p style={{ fontSize: 18, fontWeight: 600, color: primary, marginBottom: 20 }}>
              La plataforma que conecta tu talento con quien lo necesita.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: muted, maxWidth: 600, margin: "0 auto 16px" }}>
              Jukjam es un marketplace donde artistas seleccionados pueden ofrecer sus shows de forma clara, estructurada y justa. Sin regateos. Sin intermediarios que no conoces. Sin sorpresas.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: muted, maxWidth: 600, margin: "0 auto 32px" }}>
              El modelo es simple: tú nos entregas tu material y la información de tu show, nosotros hacemos la curaduría, y si eres seleccionado publicamos tu perfil. Cuando un contratante reserva y paga tu show, tú lo realizas y nosotros te transferimos el dinero descontando únicamente nuestra comisión del 10%.
            </p>
            <Link
              href="/registrate-musico"
              style={{ display: "inline-block", padding: "14px 32px", borderRadius: 999, backgroundColor: primary, color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none" }}
            >
              Quiero aplicar
            </Link>
          </div>

          <Divider />

          {/* ── PROCESO DE ENTRADA ── */}
          <section style={{ marginBottom: 64 }}>
            <SectionLabel>Selección</SectionLabel>
            <SectionTitle>El proceso para entrar a Jukjam</SectionTitle>
            <Body>
              Jukjam no es una plataforma abierta. Cada artista que aparece ha pasado por un proceso de selección que garantiza la calidad de la oferta para los contratantes. Esto también te protege a ti: cuando alguien te encuentra en Jukjam, sabe que está viendo una propuesta de nivel.
            </Body>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
              {[
                { icon: "/icons/call.png",     text: "Nos contactas y nos cuentas sobre tu propuesta artística." },
                { icon: "/icons/sing.png",     text: "Nos envías tu material audiovisual." },
                { icon: "/icons/hora.png",     text: "Tenemos 10 días hábiles para revisar y tomar una decisión." },
                { icon: "/icons/musician.png", text: "Si eres seleccionado, coordinamos la publicación de tu perfil y tus shows." },
                { icon: "/icons/party.png",    text: "Tu perfil puede aparecer también en nuestras redes sociales y en BazzarBog de la Cámara de Comercio de Bogotá." },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 20px", borderRadius: 14, backgroundColor: surface }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: surfaceEl, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Image src={icon} alt="" width={16} height={16} style={{ objectFit: "contain" }} />
                  </div>
                  <p style={{ fontSize: 14, color: muted, margin: 0, lineHeight: 1.6 }}>{text}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── REQUISITOS ── */}
          <section style={{ marginBottom: 64 }}>
            <SectionLabel>Requisitos</SectionLabel>
            <SectionTitle>Lo que necesitas para aplicar</SectionTitle>

            {/* 4.1 Material */}
            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: onSurface, marginBottom: 12 }}>
                1. Material audiovisual de calidad
              </h3>
              <Body>
                Tu material es lo primero que evalúa nuestro equipo y lo primero que verá un contratante si eres seleccionado. No buscamos producción cinematográfica, pero sí necesitamos que el material capture con claridad tu calidad artística y el nivel de tus presentaciones.
              </Body>
              <Body>
                Lo mínimo que aceptamos es una producción de audio y video que permita ver y escuchar bien lo que haces en escena. Videos grabados con celular en condiciones básicas no son suficientes para estar en la plataforma.
              </Body>

              {/* Dos columnas */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
                <div style={{ padding: "20px", borderRadius: 14, backgroundColor: "rgba(0,197,116,0.08)", border: "1px solid rgba(0,197,116,0.2)" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#00C574", marginBottom: 12 }}>✓ Esto funciona</p>
                  {["Foto en escena con buena iluminación.", "Video en vivo con audio limpio.", "Producción que muestre el formato completo."].map(t => (
                    <p key={t} style={{ fontSize: 13, color: muted, margin: "0 0 8px", lineHeight: 1.5 }}>· {t}</p>
                  ))}
                </div>
                <div style={{ padding: "20px", borderRadius: 14, backgroundColor: "rgba(190,31,58,0.08)", border: "1px solid rgba(190,31,58,0.2)" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: warm, marginBottom: 12 }}>✗ Esto no es suficiente</p>
                  {["Video de celular en condiciones básicas.", "Fotos de estudio sin contexto de show.", "Material sin audio o con audio deficiente."].map(t => (
                    <p key={t} style={{ fontSize: 13, color: muted, margin: "0 0 8px", lineHeight: 1.5 }}>· {t}</p>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 12, backgroundColor: surfaceEl, borderLeft: `3px solid ${primary}` }}>
                <p style={{ fontSize: 13, color: muted, margin: 0, lineHeight: 1.6 }}>
                  <strong style={{ color: onSurface }}>Autorización de uso:</strong> al enviarnos tu material y ser aceptado, nos autorizas a usarlo para promocionar tu perfil en nuestras redes sociales y plataformas aliadas. Siempre con crédito a ti como artista.
                </p>
              </div>
            </div>

            {/* 4.2 Shows */}
            <div style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: onSurface, marginBottom: 12 }}>
                2. Shows estructurados con precio fijo
              </h3>
              <Body>
                La idea es que un contratante pueda reservarte sin tener que negociar, preguntar por precio ni esperar respuesta. Cada artista define su show con cuatro elementos claros:
              </Body>

              {/* Tarjeta de show */}
              <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid rgba(255,255,255,0.08)`, marginTop: 20 }}>
                <div style={{ padding: "14px 20px", backgroundColor: primary }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>Ejemplo de show</p>
                </div>
                {[
                  { icon: "/icons/sing.png",     label: "Nombre",      val: "Trío de Jazz Fusión — Set de 60 min" },
                  { icon: "/icons/info.png",     label: "Descripción", val: "Trío acústico (piano, contrabajo, batería). Repertorio de jazz estándar y fusión. Ideal para cenas corporativas y eventos privados." },
                  { icon: "/icons/hora.png",     label: "Duración",    val: "60 minutos" },
                  { icon: "/icons/money.png",    label: "Precio",      val: "$1.800.000 COP" },
                ].map(({ icon, label, val }, i, arr) => (
                  <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 20px", backgroundColor: surface, borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                    <Image src={icon} alt="" width={16} height={16} style={{ objectFit: "contain", flexShrink: 0, marginTop: 2, opacity: 0.6 }} />
                    <span style={{ fontSize: 13, color: muted, width: 90, flexShrink: 0 }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: onSurface }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 12, backgroundColor: surfaceEl, borderLeft: `3px solid ${warm}` }}>
                <p style={{ fontSize: 13, color: muted, margin: 0, lineHeight: 1.6 }}>
                  <strong style={{ color: onSurface }}>Regla de precio:</strong> el valor que publicas en Jukjam debe ser exactamente el mismo que ofreces en tus canales directos. La diferencia es que cuando el show se vende a través de Jukjam se aplica una comisión del 10%.
                </p>
              </div>
            </div>

            {/* 4.3 Calendario */}
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: onSurface, marginBottom: 12 }}>
                3. Tu calendario de disponibilidad
              </h3>
              <Body>
                Una vez aceptado en Jukjam, recibirás credenciales de acceso a tu panel privado. Desde ese panel podrás gestionar tu calendario de disponibilidad — la única herramienta que necesitas mantener actualizada de tu lado.
              </Body>
              <Body>
                El modelo funciona por bloqueo de fechas: por defecto el sistema te muestra como disponible todos los días. Tu responsabilidad es bloquear los días en los que ya tienes compromisos fuera de Jukjam.
              </Body>
              <div style={{ marginTop: 8, padding: "14px 18px", borderRadius: 12, backgroundColor: surfaceEl, borderLeft: `3px solid ${warm}` }}>
                <p style={{ fontSize: 13, color: muted, margin: 0, lineHeight: 1.6 }}>
                  <strong style={{ color: onSurface }}>Regla importante:</strong> si no bloqueas una fecha y te entra una reserva ese día, aplica la política de cancelación normal. Jukjam no se hace responsable por reservas que entren en fechas que debiste haber bloqueado.
                </p>
              </div>
            </div>
          </section>

          <Divider />

          {/* ── PAGOS ── */}
          <section style={{ marginBottom: 64 }}>
            <SectionLabel>Pagos</SectionLabel>
            <SectionTitle>Cómo y cuándo te pagamos</SectionTitle>
            <Body>
              Una vez confirmado que el show se realizó, recibes el valor total de la reserva menos el 10% de comisión de Jukjam. El desembolso se hace en un plazo máximo de 5 días hábiles directamente a la cuenta bancaria que registres con nosotros.
            </Body>

            {/* Ejemplo de pago */}
            <div style={{ borderRadius: 16, overflow: "hidden", marginTop: 24 }}>
              <div style={{ padding: "16px 24px", backgroundColor: surface, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: muted }}>Valor del show</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: onSurface }}>$500.000 COP</span>
              </div>
              <div style={{ padding: "16px 24px", backgroundColor: surface, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: muted }}>Comisión Jukjam (10%)</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: warm }}>− $50.000 COP</span>
              </div>
              <div style={{ padding: "16px 24px", background: `linear-gradient(135deg, ${primary} 0%, #4D2DD4 100%)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Tú recibes</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>$450.000 COP</span>
              </div>
            </div>
          </section>

          <Divider />

          {/* ── CANCELACIONES ── */}
          <section style={{ marginBottom: 64 }}>
            <SectionLabel>Política</SectionLabel>
            <SectionTitle>Cancelaciones</SectionTitle>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: onSurface, marginBottom: 12 }}>Si el contratante cancela:</h3>
            <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 24 }}>
              {[
                { cuando: "Más de 7 días antes", reembolso: "100%", artista: "Nada" },
                { cuando: "Entre 3 y 7 días antes", reembolso: "50%", artista: "50% del valor" },
                { cuando: "Menos de 72 horas antes", reembolso: "0%", artista: "100% del valor" },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 0, padding: "14px 20px", backgroundColor: surface, borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <span style={{ fontSize: 13, color: muted }}>{row.cuando}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: onSurface, textAlign: "center" }}>{row.reembolso}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: primary, textAlign: "right" }}>{row.artista}</span>
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "10px 20px", backgroundColor: surfaceEl }}>
                <span style={{ fontSize: 11, color: muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Cuándo</span>
                <span style={{ fontSize: 11, color: muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }}>Reembolso</span>
                <span style={{ fontSize: 11, color: muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right" }}>Recibes tú</span>
              </div>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: onSurface, marginBottom: 12 }}>Si tú cancelas:</h3>
            <div style={{ padding: "16px 20px", borderRadius: 14, backgroundColor: surface, borderLeft: `3px solid ${warm}` }}>
              <p style={{ fontSize: 14, color: muted, margin: 0, lineHeight: 1.6 }}>
                El contratante recibe reembolso total y la cancelación queda registrada en tu perfil. Cancelaciones repetidas sin justificación pueden resultar en la <strong style={{ color: warm }}>suspensión de tu cuenta</strong>.
              </p>
            </div>
          </section>

          <Divider />

          {/* ── LO QUE NO ESTÁ PERMITIDO ── */}
          <section style={{ marginBottom: 64 }}>
            <SectionLabel>Reglas</SectionLabel>
            <SectionTitle>Lo que no está permitido</SectionTitle>
            <Body>
              Las siguientes conductas resultan en suspensión inmediata de la cuenta:
            </Body>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {[
                "Acordar pagos con contratantes por fuera de Jukjam para evadir la comisión.",
                "Publicar material audiovisual que no sea tuyo o del que no tengas derechos.",
                "Publicar precios distintos en Jukjam a los que ofreces directamente.",
                "Cancelar shows confirmados de forma reiterada sin justificación.",
                "Subir información falsa o desactualizada en tu perfil.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 18px", borderRadius: 12, backgroundColor: surface }}>
                  <span style={{ color: warm, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✗</span>
                  <p style={{ fontSize: 14, color: muted, margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── CTA FINAL ── */}
          <section style={{ textAlign: "center" }}>
            <SectionLabel>¿Listo?</SectionLabel>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 700, color: onSurface, marginBottom: 16, lineHeight: 1.2 }}>
              ¿Quieres hacer parte de Jukjam?
            </h2>
            <p style={{ fontSize: 15, color: muted, lineHeight: 1.7, marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
              Si llegaste hasta acá y quieres aplicar, el primer paso es escribirnos. Tenemos 10 días hábiles para darte una respuesta desde que recibimos tu material completo.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/registrate-musico"
                style={{ padding: "16px 36px", borderRadius: 999, backgroundColor: primary, color: "#fff", fontWeight: 700, fontSize: 16, textDecoration: "none" }}
              >
                Quiero aplicar
              </Link>
              <a
                href="mailto:hola@jukjam.co"
                style={{ padding: "16px 28px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", color: muted, fontWeight: 600, fontSize: 15, textDecoration: "none" }}
              >
                hola@jukjam.co
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
