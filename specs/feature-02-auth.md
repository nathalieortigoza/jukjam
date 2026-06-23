# Spec — Feature 2: Registro / Auth

## Pantalla principal (catálogo)

El header de la pantalla principal muestra tres acciones de cuenta:
- **"Crear cuenta"** — abre el flujo de registro de comprador.
- **"Regístrate como músico"** — abre el formulario de postulación.
- **"Ingresa"** — abre el modal de login.

El usuario puede navegar y explorar el catálogo sin registrarse. El registro solo se exige al momento de hacer una reserva.

---

## Flujo 1 — Crear cuenta (comprador)

**Campos:**
- Nombre
- Apellido
- Celular (con dropdown de indicativo de país — ver detalle abajo)

**OTP:**
- Se envía por WhatsApp al número ingresado.
- 6 dígitos, válido por 10 minutos.
- Botón "Reenviar código" se habilita a los 60 segundos del envío.
- Al ingresar el código correcto → usuario registrado y autenticado.

---

## Flujo 2 — Ingresa (login)

Modal con:
- Dropdown de indicativo de país + campo de celular.
- Botón para solicitar OTP por WhatsApp.
- Link "¿No tenés cuenta? Registrate" dentro del mismo modal.

El flujo de verificación es idéntico al de registro (OTP 6 dígitos, 10 min, reenvío a los 60 seg).

---

## Flujo 3 — Regístrate como músico

Formulario con todos los campos obligatorios:
- Nombre
- Apellidos
- Correo electrónico
- Nombre del proyecto musical
- Descripción del proyecto
- Link del portafolio

**Al enviar:**
- Mensaje de confirmación en pantalla: *"Gracias, revisaremos tu portafolio y estaremos contactándonos contigo dentro de los siguientes 10 días hábiles."*
- El formulario se envía por email a jukjam@gmail.com.

---

## Dropdown de indicativo de país

- Lista curada de países frecuentes al inicio (Colombia, México, Argentina, España, EE.UU., entre otros).
- El resto de países disponibles debajo, ordenados alfabéticamente.
- Colombia (+57) como valor por defecto.
