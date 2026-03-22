Scaffold a new API domain module for the QuestLog frontend.

The user will provide the domain name (e.g. `games`, `reviews`) and a list of operations it needs to support. If no arguments are given, ask for them.

Arguments: $ARGUMENTS

## Steps

1. Read `src/api/client.ts` to understand the fetch wrapper before writing anything.
2. Read any existing domain module (e.g. `src/api/games.ts`) as a reference for the pattern.
3. Read the relevant types in `src/types/` — use existing interfaces, or define new ones there if the domain introduces new shapes.
4. Create the module at `src/api/<domain>.ts`.

## Module conventions

**Always use the `client` wrapper** — never call `fetch` directly in a domain module.

```ts
import { client } from '@/api/client'
import type { MyType } from '@/types/myType'

export async function getThings(): Promise<MyType[]> {
  return client<MyType[]>('/things')
}

export async function createThing(payload: CreateThingPayload): Promise<MyType> {
  return client<MyType>('/things', { method: 'POST', body: JSON.stringify(payload) })
}
```

**HTTP method mapping**
- Read (list): `GET /resource`
- Read (single): `GET /resource/:id`
- Create: `POST /resource`
- Full update: `PUT /resource/:id`
- Partial update: `PATCH /resource/:id`
- Delete: `DELETE /resource/:id`

**Typing**
- Return types must be explicit — no `any`
- Define request payload types inline if they are only used in this module; move them to `src/types/` if they will be reused
- Import types from `@/types/` using the `@/` alias

**Error handling**
- Do not catch errors in the module — let them propagate to the calling store or component

**Style**
- No semicolons, single quotes, 100-char line width

After generating the module, confirm the file path and remind the user to run `npm run lint`.
