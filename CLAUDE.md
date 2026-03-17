# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QuestLog is a video game tracking web app. Users can search games and consoles, maintain a personal game library with per-game status (not started / in progress / completed / abandoned), view library analytics (time-to-beat, genre breakdowns, etc.), wishlist upcoming games, and write reviews. This Vue frontend targets a Go REST API backend.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Type-check + build for production
npm run build-only   # Build without type-checking
npm run type-check   # Run vue-tsc type checking only
npm run lint         # Run oxlint then eslint (both with --fix)
npm run format       # Format src/ with Prettier
npm run preview      # Preview production build
```

## Architecture

Vue 3 + TypeScript + Vite frontend targeting a Go REST API backend.

- **Entry**: `src/main.ts` — creates Vue app, installs Pinia, then Vue Router
- **Router**: `src/router/index.ts` — Vue Router 5 with web history; `requiresAuth` meta guard redirects to `/auth/login`; routes are nested under two layouts
- **Layouts**: `src/layouts/` — `DefaultLayout.vue` (authenticated, has nav) and `AuthLayout.vue` (login/register)
- **Views**: `src/views/` — route-level page components, grouped by domain (`auth/`, `games/`, `consoles/`, `library/`, `wishlist/`, `analytics/`)
- **Stores**: `src/stores/` — Pinia composition API stores (`auth`, `library`, `wishlist`)
- **API layer**: `src/api/` — `client.ts` is a thin `fetch` wrapper that injects the JWT from localStorage; domain modules (`auth`, `games`, `consoles`, `library`, `wishlist`, `reviews`) call it
- **Types**: `src/types/` — shared TypeScript interfaces (`user`, `game`, `console`, `library` which also holds `WishlistEntry`, `Review`, and `LibraryStatus`)
- **Path alias**: `@/` maps to `src/`

**API base URL**: set via `VITE_API_BASE_URL` env var (defaults to `http://localhost:8080`)

**Library status values**: `'not_started' | 'in_progress' | 'completed' | 'abandoned'`

## Code Style

- No semicolons, single quotes, 100-char line width (Prettier)
- Linting uses two tools: oxlint (fast Rust linter) + ESLint; both run on `npm run lint`
- Stores follow composition API pattern (refs + computed + functions, not options object)
