Generate a new Vue 3 component for the QuestLog frontend.

The user will provide a component name and description of what it should do. If no arguments are given, ask for them.

Arguments: $ARGUMENTS

## Requirements

Read any closely related existing components first to understand context and avoid duplication.

Follow these project conventions exactly:

**Script block**
- `<script setup lang="ts">` always
- Import from `@/` path alias
- Composition API only — refs, computed, functions; no options API
- Type all props with `defineProps<{ ... }>()`
- Type all emits with `defineEmits<{ ... }>()`

**Template**
- Tailwind CSS v4 utility classes only
- Reference theme tokens with `var()` syntax: `bg-[var(--color-accent)]` NOT `bg-accent`
- Light mode styles first, `dark:` variants for dark mode overrides
- Light mode surfaces: `bg-white` or `bg-neutral-50` for cards; `border-neutral-200` or `border-neutral-300` for borders — never `border-black/10`
- Dark mode surfaces: `dark:bg-white/5`, `dark:border-white/10`
- Text: `text-fg-dim dark:text-fg` for primary, `text-muted` for secondary
- Accent color: `bg-[var(--color-accent)]`, `text-[var(--color-accent)]`, `focus:ring-[var(--color-accent)]`

**Accessibility**
- All interactive elements must have an accessible label (`aria-label` or visible `<label>`)
- Loading states use `:aria-busy="true"`
- Error messages use `role="alert"`
- Inputs with errors use `:aria-invalid="true"` and `aria-describedby` pointing to the error element
- Buttons that are icon-only must have `aria-label`
- Heading hierarchy: `<h1>` for page/brand title, `<h2>` for section titles — do not skip levels

**Style**
- No semicolons, single quotes, 100-char line width (matches Prettier config)
- No inline styles — use Tailwind classes or `var()` references only

After generating the component, confirm the file path and remind the user to run `npm run lint` to catch any issues.
