<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <RouterView v-if="auth.initialized" />
  <div v-else class="flex min-h-dvh items-center justify-center bg-white dark:bg-canvas">
    <div class="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-[var(--color-accent)]" />
  </div>
</template>
