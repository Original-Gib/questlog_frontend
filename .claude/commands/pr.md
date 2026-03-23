Run a combined code review and security review of the current branch before merging.

## Step 1 — Identify the PR

Run `gh pr list` to show open PRs, or if a PR number is provided in the arguments use that directly.

Arguments: $ARGUMENTS

Run `gh pr view <number>` then `gh pr diff <number>` to get the full diff.

## Step 2 — Code Review

Analyse the diff and provide a thorough review covering:

- **Overview**: what the PR does in 2–3 sentences
- **Correctness**: logic errors, edge cases, broken flows
- **Project conventions**: composition API stores, `var()` token syntax, lazy route imports, `@/` path alias, no semicolons/single quotes
- **Accessibility**: `aria-*` attributes, heading hierarchy, `role="alert"` on errors
- **Styling**: light mode contrast (no `border-black/10`), dark mode `dark:` variants, no hardcoded colours outside theme tokens
- **Performance**: unnecessary re-renders, missing `v-key`, large eager imports that should be lazy
- **Security**: any obvious client-side issues (auth guard bypasses, `v-html` with user content, sensitive data in component state)

## Step 3 — Security Review

Perform a focused security review of the same diff:

- **Auth guard**: confirm the router `beforeEach` guard is active and all protected routes sit under the `requiresAuth` parent
- **XSS**: flag any `v-html` usage with non-static content
- **Token handling**: confirm JWTs are sourced from the Supabase session, not localStorage directly
- **OAuth redirect**: confirm `redirectTo` is not user-controlled
- **Sensitive data**: check for secrets, tokens, or PII logged to the console or stored in component state
- **Input validation**: flag form fields that send data to the backend without any client-side validation

## Output format

Produce two clearly labelled sections: **Code Review** and **Security Review**. Use bullet points. Flag blockers (must fix before merge) separately from suggestions (nice to have). End with a clear merge recommendation: `LGTM`, `LGTM with minor fixes`, or `Needs changes`.
