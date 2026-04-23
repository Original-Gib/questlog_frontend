<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Game } from '@/types/game'
import { gamesApi } from '@/api/games'
import GameCard from '@/components/GameCard.vue'

type Tab = 'popular' | 'upcoming'

const activeTab = ref<Tab>('popular')

const popular = ref<Game[]>([])
const popularLoading = ref(true)
const popularError = ref('')

const upcoming = ref<Game[]>([])
const upcomingLoading = ref(false)
const upcomingError = ref('')
const upcomingFetched = ref(false)

async function fetchPopular() {
  popularLoading.value = true
  popularError.value = ''
  try {
    const data = await gamesApi.getPopular()
    popular.value = data.games
  } catch (e: unknown) {
    popularError.value = e instanceof Error ? e.message : 'Failed to load popular games'
  } finally {
    popularLoading.value = false
  }
}

async function fetchUpcoming() {
  upcomingLoading.value = true
  upcomingError.value = ''
  try {
    const data = await gamesApi.getUpcoming()
    upcoming.value = data.games
    upcomingFetched.value = true
  } catch (e: unknown) {
    upcomingError.value = e instanceof Error ? e.message : 'Failed to load upcoming games'
  } finally {
    upcomingLoading.value = false
  }
}

function selectTab(tab: Tab) {
  activeTab.value = tab
  if (tab === 'upcoming' && !upcomingFetched.value) {
    fetchUpcoming()
  }
}

onMounted(fetchPopular)
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-fg-dim dark:text-fg">Games</h1>

    <!-- Tabs -->
    <div class="flex gap-1 border-b border-neutral-200 dark:border-white/10" role="tablist">
      <button
        v-for="{ key, label } in [{ key: 'popular', label: 'Popular' }, { key: 'upcoming', label: 'Upcoming' }]"
        :key="key"
        role="tab"
        :aria-selected="activeTab === key"
        :tabindex="activeTab === key ? 0 : -1"
        class="px-4 py-2 text-sm font-medium transition-colors"
        :class="activeTab === key
          ? 'border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]'
          : 'text-muted hover:text-fg-dim dark:hover:text-fg'"
        @click="selectTab(key as Tab)"
      >
        {{ label }}
      </button>
    </div>

    <!-- Popular tab -->
    <template v-if="activeTab === 'popular'">
      <div v-if="popularLoading" class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
      <div v-else-if="popularError" role="alert" class="flex flex-col items-center gap-4 py-16 text-center">
        <p class="text-sm text-alert">{{ popularError }}</p>
        <button
          type="button"
          class="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          @click="fetchPopular"
        >
          Try again
        </button>
      </div>
      <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <GameCard v-for="game in popular" :key="game.id" :game="game" />
      </div>
    </template>

    <!-- Upcoming tab -->
    <template v-else>
      <div v-if="upcomingLoading" class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
      <div v-else-if="upcomingError" role="alert" class="flex flex-col items-center gap-4 py-16 text-center">
        <p class="text-sm text-alert">{{ upcomingError }}</p>
        <button
          type="button"
          class="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          @click="fetchUpcoming"
        >
          Try again
        </button>
      </div>
      <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <GameCard v-for="game in upcoming" :key="game.id" :game="game" />
      </div>
    </template>
  </div>
</template>
