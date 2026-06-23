# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Proyecto

**Jukjam** es un marketplace web para contratar músicos alternativos en Colombia (jazz, folk, música de autor, tango-pop, rock acústico, salsa, entre otros). Conecta compradores (empresas con eventos corporativos y personas con celebraciones privadas) con músicos curados. Opera con precios fijos por show, pago retenido hasta confirmación con código (modelo Uber), y comisión del 10% al músico. Mercado inicial: Bogotá. Moneda: pesos colombianos (COP).

## Documentos de referencia

- **`PRD-Jukjam.md`** — fuente de verdad del producto: problema, usuarios, flujos, MVP (P0/P1/P2), happy/unhappy paths, métricas y open questions.
- **`DESIGN.md`** — sistema de diseño: tokens de color, tipografía, espaciado, bordes y componentes. Formato Google DESIGN.md spec, validado con `@google/design.md`.
- **`specs/`** — specs detalladas por feature (landing, catálogo, auth, perfil, reserva, tablero, reseñas, admin).

## Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Estilos:** Tailwind v4 (tokens exportados desde DESIGN.md)
- **Base de datos:** PostgreSQL + Prisma
- **Archivos:** Cloudinary (fotos de músicos)
- **Pagos:** Wompi
- **OTP / WhatsApp:** Twilio
- **Deploy:** Vercel

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run lint     # lint
```

## Design system

Para lintear `DESIGN.md` después de modificarlo:

```bash
npx @google/design.md lint DESIGN.md
```

Para exportar tokens a Tailwind v4:

```bash
npx @google/design.md export --format css-tailwind DESIGN.md > src/app/theme.css
```

Los colores fueron derivados visualmente de capturas de Figma — verificar valores exactos contra el archivo fuente antes de implementar en producción.

## Decisiones técnicas

- El stack aún no está definido. Antes de proponer implementaciones, consultar el PRD para entender:
- El MVP (P0) no incluye calendario del músico — ese es P1.
- La incorporación de músicos es manual y curada por el equipo, no hay registro abierto.
- El registro de usuarios usa OTP por WhatsApp (Twilio), sin contraseña tradicional.
- La plataforma es web responsiva (no app nativa).
- Moneda: pesos colombianos (COP) en V1.
