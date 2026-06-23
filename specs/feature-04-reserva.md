# Spec — Feature 4: Solicitud de reserva

## Flujo completo

### 0. Autenticación requerida

Si el comprador hace clic en "Reserva ahora" sin sesión iniciada, se abre un modal con las opciones:
- **"Iniciar sesión"**
- **"¿No estás registrado? Creá tu cuenta"**

Al autenticarse, el modal se cierra y el flujo de reserva continúa automáticamente sin perder los datos del show elegido.

### 1. Página de reserva

El comprador llega desde el botón "Reserva ahora" de un show específico. El show ya viene elegido y no se puede cambiar en esta página.

**Campos:**

- **Nombre del evento** — campo de texto libre. Ej: "Cumple abuela", "Fiesta de fin de año". Lo identifica en el tablero.
- **Fecha** — pre-llenada desde la búsqueda inicial, editable.
- **Hora** — pre-llenada desde la búsqueda inicial, editable.
- Si el comprador cambia fecha u hora → se verifica disponibilidad del músico en tiempo real.
  - Si no hay disponibilidad → alerta + calendario con fechas disponibles resaltadas y horas disponibles habilitadas únicamente.
- **Dirección** — campo de texto libre. Tooltip: *"Por ahora solo operamos en Bogotá."*
- **Descripción del evento / sugerencias de canciones** — texto libre.
- **Correo de confirmación** — se guarda asociado a la cuenta del usuario. En futuras reservas aparece pre-llenado pero es editable.

---

### 2. Review

Resumen de la reserva antes de pagar:

- Músico y show elegido.
- Fecha y hora.
- Dirección.
- Descripción del evento.
- Precio total del show en COP (sin desglose de comisión).

Botón **"Confirmo"** para avanzar al pago.

---

### 3. Pasarela de pago

Wompi. El comprador completa el pago desde la interfaz de Wompi.

---

### 4. Pantalla de confirmación

Tras el pago exitoso se muestra:

- Mensaje "Felicitaciones".
- Foto del músico.
- Datos del show: nombre del músico, fecha, hora, lugar.
- **Código de confirmación** del show.
- Botón **"Ir a mis eventos"** → redirige al tablero del comprador.

---

## Notificaciones post-pago

Se envían automáticamente al confirmar el pago:

**WhatsApp** (al celular registrado) y **Email** (al correo de confirmación), ambos con:
- Datos del show: músico, fecha, hora, lugar.
- Código de confirmación.
- Datos de contacto del artista: celular y email.
