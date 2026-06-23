# PRD — Jukjam

## 1. Problema

Quien quiere contratar un músico fuera de los géneros populares (mariachi, vallenato) no sabe dónde encontrar opciones. El proceso actual — boca a boca, redes sociales, contactos — es lento, opaco en precios y genera desconfianza. El resultado: el comprador contrata siempre los mismos géneros o directamente no contrata. Del lado del músico, son malos en mercadeo, no tienen tiempo para conseguir clientes y frecuentemente les ofrecen pagar mal o nada. La profesión no está dignificada.

## 2. Usuario objetivo

**Compradores:** empresas con eventos corporativos (día de la familia, despedida de año) y personas naturales con celebraciones privadas en Bogotá. Sin conocimiento profundo del mercado musical. Quieren decidir rápido con información clara.

**Músicos:** artistas de géneros alternativos (jazz, folk, música de autor, tango-pop, jazz fusión, rock acústico, salsa, música romántica moderna) en Bogotá. Buenos en su arte, malos en mercadeo. Los gigs son ingresos complementarios, no su única fuente.

## 3. Visión

Que los músicos alternativos puedan vivir de su arte sin cargar con el peso de negociar y vender, y que cualquier persona pueda descubrir y contratar fácilmente un músico de calidad. Convertirse en el lugar por defecto para contratar música en vivo en Colombia.

## 4. Estrategia

- **Mercado inicial:** Bogotá.
- **Modelo de negocio:** comisión del 10% por transacción, cobrada al músico.
- **Moneda MVP:** pesos colombianos (COP).
- **Posicionamiento:** marketplace curado (no abierto) con experiencia de compra simple, inspirada en Booking.com — búsqueda por género y fecha, decisión sin fricción.
- **Ventaja:** plataforma curada vs. Tu Toque (first mover con UX deficiente y proceso por WhatsApp). Calidad garantizada por selección editorial.
- **Por qué ahora:** el mercado de eventos se recuperó post-pandemia y no existe una solución digital fluida para este segmento en Colombia.

## 5. Principios del producto

- Experiencia de compra sin fricción — el comprador decide solo, sin negociar.
- Catálogo curado sobre volumen — calidad por encima de cantidad de músicos.
- Precio fijo y transparente — elimina la incomodidad de negociar.
- Mobile-friendly desde el día uno (web responsiva, no app nativa).
- Protección mutua — el dinero no se libera hasta que el show ocurre.
- Self-explanatory — la interfaz se entiende sola, sin onboarding.

## 6. Propuesta de valor

**Para el comprador:** encontrá y reservá un músico de calidad en minutos, con precio claro y sin tener que negociar.

**Para el músico:** recibí contratos sin hacer mercadeo. Tocá, cobrá justo.

**Diferencia vs. Tu Toque:** experiencia fluida, precios visibles, sin depender de WhatsApp para cerrar.

## 7. Casos de uso principales

1. **Comprador busca músico:** filtra por género musical, fecha y hora de inicio del evento → ve lista de músicos disponibles con foto, rango de precio (ej. $600.000–$2.400.000 COP) y descripción de shows → entra al perfil con videos, fotos y detalle de cada show → solicita la reserva (requiere registro).
2. **Comprador confirma el show:** el día del evento presenta el código que recibió al pagar → el músico lo registra → se confirma el servicio y se libera el pago.
3. **Comprador recupera el código:** si olvidó el código, puede solicitarlo nuevamente desde el tablero de shows contratados ("¿Olvidaste tu código? Reenviar") vía email o WhatsApp.
4. **Músico gestiona disponibilidad:** el músico marca las fechas y horas en que no está disponible; la plataforma bloquea automáticamente los shows ya agendados con holgura de 1 hora antes y 1 hora después.
5. **Comprador deja reseña:** después del show confirmado, el comprador puede calificar al músico.

## 8. MVP

**P0 — imprescindible para lanzar:**
- Catálogo curado de músicos con fotos, videos, descripción de shows y rango de precio en COP.
- Búsqueda y filtro por género musical, fecha y hora de inicio.
- Perfil de músico con repertorio completo (puede ofrecer shows en múltiples géneros).
- Registro e inicio de sesión por OTP (email o celular) — compradores y músicos con flujos separados.
- Ver perfiles sin registro; reservar requiere registro.
- Solicitud de reserva con coordinación de pago por fuera (V1 sin pago en línea).
- Tablero del comprador con shows contratados y opción de reenvío de código.
- Reseñas post-show.
- Gestión interna del equipo para cargar y administrar perfiles de músicos.
- Disclaimer de sonido visible en el flujo de reserva.

**P1 — próxima iteración:**
- Pago en línea con retención hasta confirmación por código (modelo Uber).
- Panel del músico para gestionar su propio calendario directamente en la plataforma.
- Bloqueo automático al agendar un show: 1 hora antes + duración del show + 1 hora después.
- Aviso al músico al configurar su agenda: *"El tiempo que dejés libre es cuando los clientes podrán agendarte. Si estás ocupado hasta las 6pm, bloqueá hasta las 7pm para contemplar el desplazamiento en Bogotá."*
- Penalización automática al músico por cancelación.

**P2 — futuro:**
- Integración con Google Calendar para los músicos.
- Panel de autogestión del músico para su perfil.
- Métricas para el músico (visitas, conversiones).
- Expansión a otras ciudades.

## 9. Qué NO vamos a construir en V1

- App móvil nativa.
- Chat entre comprador y músico.
- Pago en línea (va en P1).
- Panel de autogestión del músico (va en P1 para calendario, P2 para perfil).
- Integración con Google Calendar (va en P2).
- Registro abierto de músicos — la incorporación es manual y curada por el equipo.
- Onboarding — la interfaz debe ser autoexplicativa.

## 10. Gestión del sonido — Disclaimer

La plataforma debe mostrar claramente a compradores y músicos:

- **Shows en espacios cerrados de pequeña envergadura:** el sonido está incluido en el valor de la tarifa del músico.
- **Shows con más de 30 personas o en espacios abiertos:** el costo del sonido debe ser coordinado y acordado por las partes, y puede generar costos adicionales al valor de la reserva.

Este disclaimer aplica también al proceso de incorporación de músicos a la plataforma.

## 11. Lógica de disponibilidad

Cuando el equipo registra un show bookeado, el sistema bloquea automáticamente: **1 hora antes del show + duración del show + 1 hora después.**

Cuando el músico bloquea manualmente su agenda (disponible en P1), debe indicar el tiempo real en que no está disponible incluyendo su propio tiempo de desplazamiento. La plataforma le muestra un aviso claro: *"El tiempo que dejés libre es cuando los clientes podrán agendarte. Si estás ocupado hasta las 6pm, bloqueá hasta las 7pm para contemplar el desplazamiento."*

El tiempo de desplazamiento por defecto en Bogotá se asume en 1 hora.

La búsqueda del comprador filtra por fecha y hora exacta de inicio, mostrando solo músicos con disponibilidad real en ese bloque de tiempo.

## 12. Happy path

El comprador busca "jazz" para el 15 de julio a las 8pm → ve 3 opciones disponibles → entra al perfil, mira el video, elige el show de 2 horas → se registra con OTP → solicita la reserva → el equipo confirma y coordina el pago → el día del evento presenta el código → el músico lo registra → se libera el pago → el comprador deja una reseña.

## 13. Unhappy paths

- **Sin resultados para un filtro:** pantalla amigable que se disculpa, informa que no hay músicos disponibles para ese género, fecha y hora, e invita a explorar otras opciones.
- **Comprador cancela con más de 7 días de anticipación:** devolución del 100% del valor pagado.
- **Comprador cancela con menos de 7 días de anticipación:** penalización del 40% del valor pagado.
- **Músico cancela el show:** devolución del 100% al comprador + penalización al músico *(mecanismo exacto — definir en P1).*
- **Comprador olvidó el código:** puede solicitarlo nuevamente desde el tablero vía email o WhatsApp.
- **Código no confirmado:** el músico no debe dar el show sin código, ya que esto garantiza que el pago fue procesado. El sistema debe dejarlo claro en las instrucciones al músico.
- **Músico sin disponibilidad actualizada:** *(mitigado en P1 con calendario propio; en V1 gestionado manualmente por el equipo).*

## 14. Requisitos funcionales *(borrador — revisar)*

- Búsqueda y filtrado por género, fecha y hora de inicio.
- Perfil de músico con fotos, videos, múltiples shows y rango de precio.
- Registro separado para compradores y músicos vía OTP.
- Formulario de solicitud de reserva.
- Tablero del comprador con shows contratados y reenvío de código.
- Sistema de reseñas post-show.
- Panel interno de administración para gestionar músicos y reservas.
- Disclaimer de sonido visible en el flujo de reserva.

## 15. Requisitos no funcionales *(borrador — revisar)*

- Web responsiva, experiencia mobile de alta calidad.
- Carga rápida de videos (considerar CDN).
- Disponible en español.
- Moneda: pesos colombianos (COP) en V1.

## 16. Criterios de aceptación *(borrador — revisar)*

- Dado un visitante, cuando navega el catálogo, entonces puede ver perfiles completos sin registrarse.
- Dado un comprador, cuando intenta reservar, entonces se le pide registro por OTP.
- Dado un filtro sin resultados, cuando no hay músicos disponibles, entonces ve una pantalla amigable con sugerencia de explorar otras opciones.
- Dado un show pagado, cuando el comprador solicita el código, entonces lo recibe por email o WhatsApp.
- Dado un show bookeado, cuando el sistema lo registra, entonces bloquea automáticamente 1 hora antes + duración + 1 hora después en la agenda del músico.

## 17. Métricas de éxito

- **Mes 1:** 4 shows bookeados, 5 músicos activos en la plataforma.
- **Mes 3:** 2 shows bookeados por semana (≈8/mes).
- **Secundarias *(borrador — revisar)*:** tasa de conversión visita → reserva; calificación promedio de reseñas.

## 18. Open Questions

- ¿El rango de precio en el catálogo muestra el mínimo y máximo de todos los shows del músico, o se muestra el precio de cada show por separado?
- ¿Cómo se notifica al músico cuando llega una reserva en V1 (email, WhatsApp)?
- ¿Qué penalización exacta recibe el músico si cancela un show?
- ¿El registro de músicos tiene un flujo visible en la web o es solo por contacto directo con el equipo?
- ¿El músico puede configurar un tiempo de desplazamiento personalizado diferente a la hora por defecto?

## 19. Links *(borrador — revisar)*
- personas.md
- research/entrevistas.md
- metricas.md
