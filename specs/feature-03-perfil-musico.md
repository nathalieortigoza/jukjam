# Spec — Feature 3: Perfil del músico

## Estructura de la página

### Header
- Nombre del artista.
- Tipo (solista / grupo musical).
- Flecha de regreso al catálogo.

### Stats
- ⭐ Calificación promedio.
- Número de shows completados en Jukjam (arranca en 0, sube automáticamente con cada show confirmado).
- Botón **"Seguir"** — guarda el músico en los favoritos del comprador.

### Secciones (en orden)

1. **Fotos** — galería horizontal. Las fotos se alojan en Cloudinary y se referencian por URL desde el panel admin.

2. **Así sonamos** — video embebido de YouTube + lista de canciones debajo del player.

3. **Shows** — cards visibles directamente en la página (sin botón intermedio). Solo shows privados en V1.
   - Cada card muestra: nombre del show, duración, valor en COP, descripción con opción "ver más", botón **"Reserva ahora"**.

4. **Descripción** — texto libre del artista.

5. **Géneros** — lista de géneros musicales del músico.

6. **Comentarios** — reseñas con avatar, nombre del comprador, calificación con estrella y texto.

7. **Políticas de cancelación** — abre un modal con el siguiente texto:

   > **Políticas de cancelación**
   >
   > - Si cancelás con más de 7 días de anticipación: te devolvemos el 100% del valor pagado.
   > - Si cancelás con menos de 7 días de anticipación: se aplica una penalización del 40%, por lo que se te devuelve el 60% del valor pagado.
   > - Si el músico cancela el show: te devolvemos el 100% del valor pagado.

---

## Assets

- **Videos:** embebidos desde YouTube. El equipo carga la URL del video en el panel admin.
- **Fotos:** alojadas en Cloudinary. El equipo sube las fotos y referencia las URLs desde el panel admin.

---

## Fuera de V1

- Botón "Mensajes".
- Sección de Disponibilidad.
- Tab de shows públicos.
- Contador de Seguidores.
