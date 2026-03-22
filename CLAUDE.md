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

- **Entry**: `src/main.ts` — creates Vue app, installs Pinia, then Vue Router; calls `auth.initialize()` (non-blocking) before mounting
- **Router**: `src/router/index.ts` — Vue Router 5 with web history; `beforeEach` guard redirects unauthenticated users to `/auth/login` when `meta.requiresAuth` is true; routes are nested under two layouts
- **Layouts**: `src/layouts/` — `DefaultLayout.vue` (authenticated, has nav + theme toggle) and `AuthLayout.vue` (login/register, background image carousel + theme toggle)
- **Views**: `src/views/` — route-level page components, grouped by domain (`auth/`, `games/`, `consoles/`, `library/`, `wishlist/`, `analytics/`)
- **Stores**: `src/stores/` — Pinia composition API stores (`auth`, `theme`, `library`, `wishlist`)
- **API layer**: `src/api/` — `client.ts` is a thin `fetch` wrapper that injects the JWT from the active Supabase session; domain modules (`auth`, `games`, `consoles`, `library`, `wishlist`, `reviews`) call it
- **Auth**: `src/lib/supabase.ts` exports a singleton Supabase client; `src/stores/auth.ts` wraps it with `initialize()`, `login()`, `register()`, `loginWithOAuth()`, and `logout()`
- **Types**: `src/types/` — shared TypeScript interfaces (`user`, `game`, `console`, `library` which also holds `WishlistEntry`, `Review`, and `LibraryStatus`)
- **Path alias**: `@/` maps to `src/`

**API base URL**: set via `VITE_API_BASE_URL` env var (defaults to `http://localhost:8080`)

**Supabase**: authentication is handled directly by the frontend via `@supabase/supabase-js`. The Go backend only verifies JWTs issued by Supabase — it does not handle login or session management. All other data mutations (e.g. adding a game to the library) go through the Go backend.

**Required env vars** (see `.env.example`):
- `VITE_SUPABASE_URL` — your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — your Supabase publishable anon key
- `VITE_API_BASE_URL` — Go backend base URL

**Library status values**: `'not_started' | 'in_progress' | 'completed' | 'abandoned'`

## Authentication Flow

1. `auth.initialize()` is called in `main.ts` before mount — fetches the current Supabase session and subscribes to `onAuthStateChange`
2. `App.vue` shows a loading spinner until `auth.initialized` is true, preventing a flash of unauthenticated content
3. The router `beforeEach` guard checks `auth.isAuthenticated` and redirects to `/auth/login` if a protected route is accessed without a session
4. OAuth sign-in (Google, Twitch, Discord) redirects to `window.location.origin` after completing

## Styling

Tailwind CSS v4 with a custom theme defined in `src/assets/main.css`. Dark mode is toggled by adding the `.dark` class to `<html>` via `useThemeStore`. User preference is persisted to `localStorage`.

### Theme tokens

| Token | Value | Usage |
|---|---|---|
| `--color-accent` | `#5a5ae2` | Brand purple — buttons, links, focus rings |
| `--color-alert` | `#e11818` | Error/destructive text |
| `--color-canvas` | `#000000` | Dark mode page background |
| `--color-fg` | `#f9f9fa` | Primary text on dark backgrounds |
| `--color-fg-dim` | `#1a1a23` | Primary text on light backgrounds |
| `--color-muted` | `#7d7d7d` | Secondary / placeholder text |

### Tailwind usage rules

- Tailwind v4 does not scan arbitrary CSS variables for utility generation. Always reference theme tokens with the `var()` syntax: `bg-[var(--color-accent)]`, not `bg-accent`.
- Use `dark:` variants for dark mode overrides alongside light-mode defaults.
- Light mode borders: `border-neutral-200` or `border-neutral-300`. Never use `border-black/10` (invisible on white).
- Light mode surfaces: `bg-neutral-50` for cards, `bg-white` for inputs.
- Dark mode surfaces: `dark:bg-white/5`, `dark:border-white/10`.

### Component conventions

- Shared auth UI lives in `AuthCard.vue` — do not duplicate the card shell, branding, or OAuth buttons in individual views.
- OAuth provider list is defined once in `src/lib/oauthProviders.ts`; icons are rendered by `OAuthIcon.vue` (inline SVG, no `v-html`).
- `ThemeToggle.vue` is used in both layouts — do not inline toggle logic in individual components.
- Heading hierarchy: page/brand title uses `<h1>`, section/form titles use `<h2>`.
- All interactive form elements must include accessible attributes: `aria-label`, `aria-busy`, `aria-invalid`, `role="alert"` on error messages, `aria-describedby` linking inputs to their error element.

## Code Style

- No semicolons, single quotes, 100-char line width (Prettier)
- Linting uses two tools: oxlint (fast Rust linter) + ESLint; both run on `npm run lint`
- Stores follow composition API pattern (refs + computed + functions, not options object)
