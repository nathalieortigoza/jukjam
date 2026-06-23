# Spec — Feature 7: Panel admin interno

## Acceso

- URL protegida con usuario y contraseña tradicional.
- Un solo usuario administrador en V1.

---

## Gestión de músicos

### Crear perfil
Campos por músico:
- Nombre.
- Descripción.
- Géneros (selección múltiple desde lista fija definida en el sistema).
- Fotos (subidas a Cloudinary, referenciadas por URL).
- Link de video (YouTube).
- Shows (hasta 4 por músico). Cada show tiene:
  - Nombre.
  - Duración.
  - Precio fijo en COP.
  - Descripción.

### Editar perfil
Todos los campos del perfil son editables después de creado.

### Desactivar músico
El músico deja de aparecer en el catálogo pero no se elimina de la base de datos.

### Eliminar músico
Elimina el perfil permanentemente del sistema.

---

## Gestión de reservas

- Ver listado de todas las reservas con sus datos (comprador, músico, show, fecha, hora, estado).
- Cambiar el estado de una reserva manualmente (Pendiente → Completado / Cancelado).
- Cancelar una reserva.
