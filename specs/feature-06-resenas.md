# Spec — Feature 6: Reseñas post-show

## Cuándo aparece

La opción de reseñar aparece automáticamente cuando un show pasa a estado **Completado**. También queda disponible en cualquier momento desde la card del show completado en el tablero — sin límite de tiempo.

Una vez enviada la reseña, no se puede modificar ni enviar una segunda. Solo se puede reseñar una vez por show.

## Flujo

1. Pantalla de reseña con:
   - Foto y nombre del artista.
   - Texto: *"Califica cómo fue tu evento con la banda."*
   - Calificación de estrellas (1–5) — **obligatoria**.
   - Campo de texto "Haz una reseña" — **opcional**.
   - Botón **"Siguiente"** para enviar.
   - Opción de saltar la reseña sin calificar.

2. Tras enviar → modal de confirmación: *"¡Tu calificación ha sido enviada!"* con botón **"Explorar Artistas"**.

## Comportamiento

- El comprador puede saltarse la reseña y volver a hacerla en cualquier momento desde la card del show completado.
- Una vez enviada, no se puede editar ni reseñar nuevamente.
- La reseña se muestra en el perfil del músico (sección Comentarios).
