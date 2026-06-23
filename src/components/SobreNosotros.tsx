export default function SobreNosotros() {
  return (
    <section
      id="sobre-nosotros"
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl font-bold mb-8"
          style={{ color: "var(--color-on-surface)" }}
        >
          Sobre nosotros
        </h2>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: "var(--color-on-surface-muted)" }}
        >
          Jukjam es la plataforma digital que pone la tecnología al servicio de
          la música. Conectamos a quienes buscan vivir experiencias musicales
          únicas con músicos profesionales, permitiéndote contratar
          presentaciones en vivo o en línea de forma fácil, rápida y segura.
        </p>
        <p
          className="text-base leading-relaxed"
          style={{ color: "var(--color-on-surface-muted)" }}
        >
          Creemos que el arte y la diversión deben ser parte de tu vida
          cotidiana, y por eso te invitamos a unirte a la comunidad Jukjam: un
          espacio donde la música y la tecnología se encuentran para crear
          momentos inolvidables.
        </p>
      </div>
    </section>
  );
}
