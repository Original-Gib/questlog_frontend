<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthCard from '@/components/AuthCard.vue'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

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
  <AuthCard title="Sign in">
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

      <p v-if="error" id="login-error" role="alert" class="text-sm text-alert">{{ error }}</p>

      <button
        type="submit"
        :disabled="loading"
        :aria-busy="loading"
        class="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>

    <template #footer>
      Don't have an account?
      <router-link :to="{ name: 'register' }" class="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline">
        Register
      </router-link>
    </template>
  </AuthCard>
</template>
