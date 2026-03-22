Scaffold a new route-level view for the QuestLog frontend.

The user will provide a view name, the domain it belongs to, and a description of what it should do. If no arguments are given, ask for them.

Arguments: $ARGUMENTS

## Steps

1. Read `src/router/index.ts` to understand the current route structure before making changes.
2. Identify the correct domain folder under `src/views/` (e.g. `games/`, `library/`, `wishlist/`, `analytics/`). Create the domain folder if it doesn't exist.
3. Create the view component at `src/views/<domain>/<Name>View.vue`.
4. Add the route to `src/router/index.ts` under the appropriate parent layout.

## View component conventions

- `<script setup lang="ts">` always
- Composition API only
- Import store(s) and API modules as needed via `@/` alias
- Keep the view lean — extract reusable UI into `src/components/`

## Router conventions

- Authenticated views go under the `DefaultLayout` parent route (`path: '/'`) with `meta: { requiresAuth: true }` already set on the parent — do not add it again on child routes unless overriding
- Auth views (login, register) go under the `AuthLayout` parent route (`path: '/auth'`)
- Use lazy imports: `component: () => import('@/views/...')`
- Name routes with kebab-case: `name: 'game-detail'`
- Path segments are kebab-case: `path: 'my-games'`

## Styling

- Tailwind CSS v4 utility classes only
- Reference theme tokens with `var()` syntax: `bg-[var(--color-accent)]` NOT `bg-accent`
- Light mode first, `dark:` variants for overrides
- Use `text-fg-dim dark:text-fg` for primary text, `text-muted` for secondary

After scaffolding, confirm the file path and the route name added, and remind the user to run `npm run lint`.
