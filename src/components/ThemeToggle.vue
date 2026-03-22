<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <footer class="flex justify-center py-4">
    <div class="flex cursor-pointer items-center gap-2 text-sm text-muted">
      <span>{{ theme.isDark ? 'Dark mode' : 'Light mode' }}</span>
      <button
        role="switch"
        :aria-checked="theme.isDark"
        :aria-label="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        class="relative h-6 w-11 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        :class="theme.isDark ? 'bg-[var(--color-accent)]' : 'bg-neutral-300'"
        @click="theme.toggle"
      >
        <span
          class="absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition-transform duration-200"
          :class="theme.isDark ? 'translate-x-5' : 'translate-x-0'"
        >
          <svg v-if="theme.isDark" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </span>
      </button>
    </div>
  </footer>
</template>
