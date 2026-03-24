<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Game } from '@/types/game'
import { gamesApi } from '@/api/games'
import GameCard from '@/components/GameCard.vue'

const games = ref<Game[]>([])
const loading = ref(true)
const error = ref('')

async function fetchPopular() {
  loading.value = true
  error.value = ''
  try {
    const data = await gamesApi.getPopular()
    games.value = data.games
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Failed to load popular games'
  } finally {
    loading.value = false
  }
}

onMounted(fetchPopular)
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-fg-dim dark:text-fg">Popular Games</h1>

    <!-- Loading skeleton -->
    <div v-if="loading" class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <div
        v-for="n in 10"
        :key="n"
        class="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-white/10 dark:bg-white/5"
      >
        <div class="aspect-[3/4] w-full animate-pulse bg-neutral-200 dark:bg-white/10" />
        <div class="flex flex-col gap-2 p-3">
          <div class="h-4 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-white/10" />
          <div class="h-3 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-white/10" />
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" role="alert" class="flex flex-col items-center gap-4 py-16 text-center">
      <p class="text-sm text-alert">{{ error }}</p>
      <button
        type="button"
        class="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        @click="fetchPopular"
      >
        Try again
      </button>
    </div>

    <!-- Games grid -->
    <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <GameCard v-for="game in games" :key="game.id" :game="game" />
    </div>
  </div>
</template>
