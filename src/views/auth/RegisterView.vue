<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''
  loading.value = true
  try {
    await auth.register(email.value, password.value)
    router.push({ name: 'home' })
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Registration failed'
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

    <form
      aria-label="Register form"
      aria-describedby="register-error"
      class="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-8 dark:border-white/10 dark:bg-white/5"
      @submit.prevent="handleRegister"
    >
      <h2 class="text-lg font-semibold text-fg-dim dark:text-fg">Create an account</h2>

      <div class="flex flex-col gap-1.5">
        <label for="email" class="text-sm text-muted">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          :aria-invalid="error ? 'true' : undefined"
          class="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-fg-dim outline-none focus:border-accent focus:ring-1 focus:ring-accent dark:border-white/10 dark:bg-white/5 dark:text-fg"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="password" class="text-sm text-muted">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          autocomplete="new-password"
          :aria-invalid="error ? 'true' : undefined"
          class="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-fg-dim outline-none focus:border-accent focus:ring-1 focus:ring-accent dark:border-white/10 dark:bg-white/5 dark:text-fg"
        />
      </div>

      <p v-if="error" id="register-error" role="alert" class="text-sm text-alert">
        {{ error }}
      </p>

      <button
        type="submit"
        :disabled="loading"
        :aria-busy="loading"
        class="mt-1 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {{ loading ? 'Creating account…' : 'Create account' }}
      </button>
    </form>

    <p class="mt-4 text-center text-sm text-muted">
      Already have an account?
      <router-link
        :to="{ name: 'login' }"
        class="font-medium text-accent underline-offset-2 hover:underline"
      >
        Sign in
      </router-link>
    </p>
  </div>
</template>
