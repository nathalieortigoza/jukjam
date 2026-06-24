---
version: alpha
name: Jukjam
description: >
  Marketplace de músicos alternativos en Colombia.
  Dark mode nativo, estética premium, mobile-first.
  La identidad visual combina profundidad oscura con acentos vibrantes
  que evocan energía musical en vivo.
colors:
  background: "#0B0D1F"
  surface: "#141629"
  surface-elevated: "#1C2040"
  primary: "#2F52DF"
  primary-hover: "#2244C8"
  on-primary: "#FFFFFF"
  brand-warm: "#BE1F3A"
  on-background: "#FFFFFF"
  on-surface: "#FFFFFF"
  on-surface-muted: "#9BA3C4"
gradients:
  gradient-fire: "linear-gradient(135deg, #FF1F1F 0%, #FF7A00 100%)"
  gradient-sunset: "linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)"
  gradient-aurora: "linear-gradient(135deg, #4D2DD4 0%, #9B2DC4 100%)"
  gradient-ocean: "linear-gradient(135deg, #3B6CF0 0%, #1B2E9C 100%)"
typography:
  h1:
    fontFamily: "Quicksand, -apple-system, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
  h2:
    fontFamily: "Quicksand, -apple-system, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
  body-md:
    fontFamily: "Quicksand, -apple-system, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Quicksand, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
  label-caps:
    fontFamily: "Quicksand, -apple-system, sans-serif"
    fontSize: 11px
    fontWeight: 600
    letterSpacing: 0.08em
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
components:
  screen:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "14px 24px"
    typography: "{typography.body-md}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "14px 24px"
  card-musician:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "16px"
  input-field:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-background}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  nav-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
  splash-hero:
    backgroundColor: "{colors.brand-warm}"
    textColor: "{colors.on-primary}"
---

## Overview

Jukjam es un marketplace oscuro y premium para descubrir y contratar músicos
alternativos en Colombia. La identidad visual se basa en tres pilares:

1. **Profundidad oscura** — fondos navy profundos que ponen el foco en los
   músicos y su arte, sin distracciones.
2. **Acción vibrante** — el azul índigo eléctrico (`primary`) es el único color
   de acción; guía al usuario hacia la reserva sin ambigüedad.
3. **Calidez de marca** — el rojo cálido (`brand-warm`) aparece solo en el
   splash y en elementos de identidad de marca, evocando energía en vivo.

La UI es mobile-first y self-explanatory: sin onboarding, sin tutoriales.
Cada pantalla debe sentirse como entrar a un venue oscuro bien iluminado.

## Colors

**background `#0B0D1F`** — el canvas base de todas las pantallas. Navy casi
negro que crea profundidad y hace que las fotos de los músicos destaquen.
Nunca usar como color de texto.

**surface `#141629`** — fondo de cards, sheets y nav bars. Eleva los componentes
sobre el background sin salir del universo oscuro.

**surface-elevated `#1C2040`** — para inputs y modales. Tercer nivel de elevación;
indica al usuario que puede interactuar con ese elemento.

**primary `#4169FF`** — azul índigo eléctrico. El único color de acción de la
plataforma. Reservado exclusivamente para botones CTA, estados activos y
elementos seleccionados. No usar para decoración.

**primary-hover `#5A7BFF`** — variante más clara del primary para hover y
estados pressed. Mantiene coherencia visual en interacciones.

**brand-warm `#E84057`** — rojo cálido de marca. Aparece en el splash screen,
el logo y ocasionalmente en elementos de identidad visual. No usar como color
de acción — eso es territorio exclusivo del primary.

**on-primary / on-surface / on-background `#FFFFFF`** — texto blanco puro
sobre fondos oscuros y el color primary. Siempre verificar contraste mínimo
4.5:1 (WCAG AA).

**on-surface-muted `#9BA3C4`** — texto secundario, labels de nav, placeholders.
Indica jerarquía inferior sin desaparecer en el fondo oscuro.

> Nota: los colores hex fueron derivados visualmente de capturas de pantalla
> del Figma. Verificar valores exactos contra el archivo fuente antes de
> implementar en producción.

## Typography

La tipografía usa **Inter** como fuente principal (con fallback a SF Pro y
system fonts). Inter a peso 700 en títulos transmite autoridad; en peso 400
en el cuerpo, legibilidad en pantallas oscuras.

**h1 (28px / 700)** — títulos de pantalla principal, nombre del artista en
perfil destacado. Una sola instancia por pantalla.

**h2 (22px / 600)** — subtítulos de sección, nombre del músico en card.
Puede coexistir con h1 cuando hay jerarquía clara.

**body-md (16px / 400)** — texto de párrafo, descripciones de shows, labels
de botón. La fuente de lectura principal de la app.

**body-sm (14px / 400)** — información secundaria: precio, género, duración
del show. Siempre acompañado de un body-md o h2 para contexto.

**label-caps (11px / 600 / 0.08em tracking)** — etiquetas en mayúsculas para
categorías, filtros y estados (DISPONIBLE, RESERVADO). Usar con moderación.

## Layout & Spacing

La escala de spacing sigue una progresión 4px base:

- **xs (4px)** — separación entre iconos e inline labels.
- **sm (8px)** — padding interno de chips y badges.
- **md (16px)** — padding estándar de cards y pantallas. El respiro mínimo
  entre el contenido y los bordes de pantalla.
- **lg (24px)** — separación entre secciones.
- **xl (32px)** — márgenes superiores de pantalla, espacio antes de CTAs.
- **2xl (48px)** — espaciado en pantallas de splash y onboarding.

La grilla del layout es de 16px de margen lateral en mobile. Nunca usar
menos de md (16px) como padding de pantalla.

## Shapes

Los bordes redondeados crean calidez sin perder la seriedad premium:

- **sm (8px)** — inputs, chips, badges pequeños.
- **md (12px)** — inputs de texto, elementos de lista.
- **lg (16px)** — cards de músicos, bottom sheets.
- **xl (24px)** — modales, cards destacadas.
- **full (9999px)** — botones pill (el estilo principal de CTA), avatares.

Los botones primarios usan siempre `full` (pill). Los inputs usan `md`.
Las cards usan `lg`. Nunca mezclar radios extremos en el mismo componente.

## Components

### screen
El contenedor base de cada pantalla. `background` como fondo, texto `on-background`
blanco. Padding horizontal mínimo de 16px (spacing.md).

### button-primary
El CTA principal de Jukjam. Pill shape (`rounded.full`), fondo `primary` azul
índigo, texto blanco. Ancho variable según contexto (puede ser full-width en
mobile). Usar solo para la acción principal de la pantalla — máximo uno por
vista.

### button-primary-hover
Estado hover/pressed del button-primary. El fondo cambia a `primary-hover`
(más claro), creando feedback visual inmediato. Sin cambio de tamaño ni sombra.

### card-musician
La unidad atómica del catálogo. Contiene foto del músico, nombre, género,
rango de precio y CTA. Fondo `surface`, bordes `rounded.lg`, padding de 16px.
Las fotos ocupan la parte superior con aspect ratio 16:9 o cuadrado según el
diseño del frame.

### input-field
Campos de texto para búsqueda, OTP y formularios. Fondo `surface-elevated`
para diferenciarse del surface del card que los contiene. Placeholder en
`on-surface-muted`.

### nav-bar
Barra de navegación inferior fija. Fondo `surface`, íconos y labels en
`on-surface-muted`. El ítem activo usa `primary` como color de ícono y label.
Altura fija de 60px más safe area del dispositivo.

### splash-hero
Elemento visual de la pantalla de bienvenida. Usa `brand-warm` como fondo
o como color dominante de la ilustración. Solo aparece en la primera pantalla
de la app; no reutilizar en flujos transaccionales.

## Do's and Don'ts

**Do:**
- Usar `primary` exclusivamente para acciones: botones, estados activos, íconos
  de navegación activos.
- Mantener jerarquía de superficie: `background` → `surface` → `surface-elevated`.
- Usar `brand-warm` solo en contextos de identidad de marca (splash, logo).
- Verificar contraste 4.5:1 en toda combinación texto/fondo antes de implementar.

**Don't:**
- No usar `brand-warm` como color de botón o acción — confunde la señal del primary.
- No agregar fondos blancos o claros en ninguna pantalla — rompe la coherencia
  del dark mode.
- No usar más de dos pesos tipográficos en la misma pantalla (700 + 400).
- No superar tres niveles de elevación de superficie en una misma vista.
