# Spec — Feature 5: Tablero del comprador

## Navegación principal

Menú lateral izquierdo (web) con tres secciones:
- **Catálogo** — lleva a la pantalla principal de búsqueda de músicos.
- **Favoritos** — músicos a los que el comprador sigue. Muestra las mismas cards del catálogo (foto, nombre, géneros, rango de precio, calificación).
- **Eventos** — tablero de shows contratados.

---

## Sección Eventos — "Mis Eventos"

### Filtros por estado

Tabs en la parte superior para filtrar por:
- **Pendiente** — pago realizado, show aún no ocurrido.
- **Cancelado** — show cancelado por el comprador o el músico.
- **Completado** — código confirmado, show realizado.

### Cards de eventos

Cada card muestra:
- Nombre del evento.
- Fecha.
- Hora.
- Artista.
- Estado.
- Código de confirmación.
- Botón **"Cancelar"** — visible solo en estado Pendiente.

### Cancelación

Al hacer clic en "Cancelar" se abre un modal de confirmación que muestra la política de cancelación:

> - Si cancelás con más de 7 días de anticipación: te devolvemos el 100% del valor pagado.
> - Si cancelás con menos de 7 días de anticipación: se aplica una penalización del 40%, por lo que se te devuelve el 60% del valor pagado.
> - Si el músico cancela el show: te devolvemos el 100% del valor pagado.

El comprador debe confirmar para proceder con la cancelación.

### Reenvío del código

Opción "¿Olvidaste tu código? Reenviar" — envía el código nuevamente por WhatsApp y email.
