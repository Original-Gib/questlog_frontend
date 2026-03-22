Generate a new Pinia store for the QuestLog frontend.

The user will provide a store name and description of what state it should manage. If no arguments are given, ask for them.

Arguments: $ARGUMENTS

## Requirements

Read any related existing stores in `src/stores/` first to understand patterns and avoid duplicating state that already exists.

Follow these conventions exactly:

**Structure**
- Use `defineStore` with composition API style (function form, not options object)
- Store ID is the kebab-case name: `defineStore('my-store', () => { ... })`
- File name matches the store name: `src/stores/myStore.ts`

**Internals**
- State: `ref<Type>(initialValue)`
- Derived values: `computed(() => ...)`
- Actions: plain `async function` declarations
- Return everything the outside world needs: `return { state, computed, actions }`
- Do not return internal helpers that are only used within the store

**Error handling**
- Actions should throw errors rather than swallowing them — let the calling component decide how to display them
- Only catch errors in actions if there is meaningful recovery logic

**Typing**
- Type all refs explicitly: `ref<User | null>(null)`
- Import types from `@/types/` where they exist; define new interfaces in `@/types/` if they'll be reused across multiple files

**Imports**
- `import { ref, computed } from 'vue'`
- `import { defineStore } from 'pinia'`
- Use `@/` path alias for all project imports

**Style**
- No semicolons, single quotes, 100-char line width

After generating the store, confirm the file path and remind the user to run `npm run lint`.
