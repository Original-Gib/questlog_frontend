<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { Provider } from '@supabase/supabase-js'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const oauthLoading = ref<Provider | null>(null)

const oauthProviders: { provider: Provider; label: string; icon: string }[] = [
  {
    provider: 'google',
    label: 'Google',
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`,
  },
  {
    provider: 'apple',
    label: 'Apple',
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.29.07 2.18.74 2.95.76.93-.19 1.83-.88 3.14-.94 1.6-.08 2.8.62 3.57 1.72-3.23 1.94-2.68 5.9.34 7.34zm-3.1-13.4C13.25 8.6 11.4 9.7 9.7 9.57c-.24-1.88 1.35-3.9 3.25-4.7.5 1.77-.24 3.71 1 2.01z"/></svg>`,
  },
  {
    provider: 'discord',
    label: 'Discord',
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  },
  {
    provider: 'github',
    label: 'GitHub',
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  },
]

async function handleOAuth(provider: Provider) {
  error.value = ''
  oauthLoading.value = provider
  try {
    await auth.loginWithOAuth(provider)
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'OAuth sign-in failed'
    oauthLoading.value = null
  }
}

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push({ name: 'home' })
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-sm">
    <div class="mb-8 flex items-center justify-center gap-3">
      <div class="flex items-center justify-center rounded-xl bg-[var(--color-accent)] p-2.5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="6" width="20" height="12" rx="4" />
          <path d="M6 12h4M8 10v4" />
          <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
          <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold tracking-tight text-fg-dim dark:text-fg">QuestLog</h1>
    </div>

    <div class="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-8 dark:border-white/10 dark:bg-white/5">
      <h2 class="text-lg font-semibold text-fg-dim dark:text-fg">Sign in</h2>

      <div class="flex justify-center gap-3">
        <button
          v-for="{ provider, label, icon } in oauthProviders"
          :key="provider"
          type="button"
          :disabled="oauthLoading !== null"
          :aria-busy="oauthLoading === provider"
          :aria-label="`Continue with ${label}`"
          class="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          @click="handleOAuth(provider)"
        >
          <span class="h-5 w-5" v-html="icon" />
        </button>
      </div>

      <div class="flex items-center gap-3">
        <hr class="flex-1 border-neutral-200 dark:border-white/10" />
        <span class="text-xs text-muted">or</span>
        <hr class="flex-1 border-neutral-200 dark:border-white/10" />
      </div>

      <form
        aria-label="Login form"
        aria-describedby="login-error"
        class="flex flex-col gap-4"
        @submit.prevent="handleLogin"
      >
        <div class="flex flex-col gap-1.5">
          <label for="email" class="text-sm text-muted">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            :aria-invalid="error ? 'true' : undefined"
            class="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-fg-dim outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] dark:border-white/10 dark:bg-white/5 dark:text-fg"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="password" class="text-sm text-muted">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            :aria-invalid="error ? 'true' : undefined"
            class="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-fg-dim outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] dark:border-white/10 dark:bg-white/5 dark:text-fg"
          />
        </div>

        <p v-if="error" id="login-error" role="alert" class="text-sm text-alert">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          :aria-busy="loading"
          class="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>
    </div>

    <p class="mt-4 text-center text-sm text-muted">
      Don't have an account?
      <router-link
        :to="{ name: 'register' }"
        class="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
      >
        Register
      </router-link>
    </p>
  </div>
</template>
