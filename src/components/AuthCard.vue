<script setup lang="ts">
import { ref } from 'vue'
import type { Provider } from '@supabase/supabase-js'
import { useAuthStore } from '@/stores/auth'
import { oauthProviders } from '@/lib/oauthProviders'
import OAuthIcon from '@/components/OAuthIcon.vue'

defineProps<{ title: string }>()

const auth = useAuthStore()
const oauthLoading = ref<Provider | null>(null)
const oauthError = ref('')

async function handleOAuth(provider: Provider) {
  oauthError.value = ''
  oauthLoading.value = provider
  try {
    await auth.loginWithOAuth(provider)
  } catch (e: unknown) {
    oauthError.value = e instanceof Error ? e.message : 'OAuth sign-in failed'
    oauthLoading.value = null
  }
}
</script>

<template>
  <div class="w-full max-w-sm">
    <!-- Branding -->
    <div class="mb-8 flex items-center justify-center gap-3">
      <div class="flex items-center justify-center rounded-xl bg-[var(--color-accent)] p-2.5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="6" width="20" height="12" rx="4" />
          <path d="M6 12h4M8 10v4" />
          <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
          <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <span class="text-2xl font-bold tracking-tight text-fg-dim dark:text-fg">QuestLog</span>
    </div>

    <!-- Card -->
    <div class="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-8 dark:border-white/10 dark:bg-white/5">
      <h1 class="text-lg font-semibold text-fg-dim dark:text-fg">{{ title }}</h1>

      <!-- OAuth buttons -->
      <div class="flex justify-center gap-3">
        <button
          v-for="{ provider, label } in oauthProviders"
          :key="provider"
          type="button"
          :disabled="oauthLoading !== null"
          :aria-busy="oauthLoading === provider"
          :aria-label="`Continue with ${label}`"
          class="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          @click="handleOAuth(provider)"
        >
          <OAuthIcon :provider="provider" class="h-5 w-5" />
        </button>
      </div>

      <p v-if="oauthError" role="alert" class="text-center text-sm text-alert">{{ oauthError }}</p>

      <div class="flex items-center gap-3">
        <hr class="flex-1 border-neutral-200 dark:border-white/10" />
        <span class="text-xs text-muted">or</span>
        <hr class="flex-1 border-neutral-200 dark:border-white/10" />
      </div>

      <!-- Form slot -->
      <slot />
    </div>

    <!-- Footer slot -->
    <p class="mt-4 text-center text-sm text-muted">
      <slot name="footer" />
    </p>
  </div>
</template>
