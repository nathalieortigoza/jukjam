# Spec — Feature 1: Catálogo de músicos

## Barra de filtros

Fila única con tres campos: género, fecha y hora.

### Campo de género
- Dropdown/autocomplete híbrido.
- Al hacer clic en la flecha se despliega la lista completa de géneros disponibles en el catálogo (solo géneros con al menos un músico activo).
- Al escribir, filtra las opciones en tiempo real dentro del dropdown.
- Si lo escrito no tiene match → muestra "Género no disponible" dentro del dropdown (no cierra ni lanza error).
- Ningún filtro es obligatorio.

### Campo de fecha
- Datepicker tipo reserva de vuelo, abre en el mes actual.
- Opcional — puede dejarse vacío.

### Campo de hora
- Selector de 12 horas (1–12) + campo AM/PM.
- Solo se habilita si hay una fecha seleccionada.
- Opcional aunque la fecha esté seleccionada.

### Combinaciones válidas
| Género | Fecha | Hora | Resultado |
|--------|-------|------|-----------|
| ✗ | ✗ | ✗ | Todos los músicos |
| ✓ | ✗ | ✗ | Músicos de ese género (todas las fechas) |
| ✗ | ✓ | ✗ | Músicos disponibles ese día |
| ✗ | ✓ | ✓ | Músicos disponibles en esa fecha y hora |
| ✓ | ✓ | ✓ | Músicos de ese género disponibles en esa fecha y hora |

### Limpiar filtros
- Cuando hay al menos un filtro activo, aparece el botón "Limpiar filtros".
- Limpiar resetea los tres campos y muestra todos los músicos.

---

## Lista de resultados

- Grilla de 3 columnas × 2 filas (6 cards por defecto).
- Selector de resultados por página: **6 / 9 / 15**.
- Paginación clásica con navegador de páginas (no scroll infinito).
- Orden por defecto: más recientes.
- El usuario puede reordenar por:
  - Calificación: mayor a menor / menor a mayor.
  - Precio: mayor a menor / menor a mayor.

---

## Card de músico

Cada card muestra:
- Foto del músico o banda.
- Nombre.
- Géneros.
- Rango de precio en COP (ej. $600.000 – $2.400.000).
- Calificación: ⭐ + número (ej. ⭐ 4.8).

---

## Estado vacío

Cuando los filtros no arrojan resultados:

> *"Lo sentimos :( no encontramos shows asociados a tu búsqueda. Puedes cambiar el filtro y buscar de nuevo."*

- Botón "Limpiar filtros" debajo del mensaje.
