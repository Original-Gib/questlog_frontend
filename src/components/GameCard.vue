<script setup lang="ts">
import { computed } from 'vue'
import type { Game } from '@/types/game'
import PlatformIcon from '@/components/PlatformIcon.vue'

const props = defineProps<{ game: Game }>()

const releaseYear = computed(() => new Date(props.game.first_release_date * 1000).getFullYear())
const roundedRating = computed(() => (props.game.rating != null ? Math.round(props.game.rating) : null))

function iconFamily(platform: string): string {
  if (platform.startsWith('PlayStation')) return 'PlayStation'
  if (platform.startsWith('Xbox')) return 'Xbox'
  if (platform === 'PC (Microsoft Windows)') return 'PC'
  if (platform === 'Nintendo Switch') return 'Nintendo Switch'
  if (platform === 'iOS' || platform === 'macOS') return 'Apple'
  return platform
}

const visiblePlatforms = computed(() => {
  const seen = new Set<string>()
  return props.game.platforms
    .filter((p) => {
      const family = iconFamily(p)
      if (seen.has(family)) return false
      seen.add(family)
      return true
    })
    .slice(0, 4)
})
</script>

<template>
  <article
    class="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-white/10 dark:bg-white/5"
    :aria-label="game.name"
  >
    <!-- Cover art -->
    <div class="aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-white/5">
      <img
        v-if="game.cover_url"
        :src="game.cover_url"
        :alt="game.name"
        loading="lazy"
        class="h-full w-full object-cover"
      />
      <div v-else class="flex h-full w-full items-center justify-center text-muted">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <rect x="2" y="6" width="20" height="12" rx="4" />
          <path d="M6 12h4M8 10v4" />
          <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
          <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
        </svg>
      </div>
    </div>

    <!-- Info -->
    <div class="flex flex-1 flex-col gap-2 p-3">
      <p class="line-clamp-2 text-sm font-semibold leading-snug text-fg-dim dark:text-fg">
        {{ game.name }}
      </p>

      <!-- Platform icons -->
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="platform in visiblePlatforms"
          :key="platform"
          class="h-4 w-4 text-muted"
        >
          <PlatformIcon :platform="platform" />
        </span>
        <span v-if="game.platforms.length > 4" class="text-xs text-muted">
          +{{ game.platforms.length - 4 }}
        </span>
      </div>

      <!-- Score and year -->
      <div class="mt-auto flex items-center gap-2 text-xs text-muted">
        <!-- Rating (popular games) -->
        <span v-if="roundedRating != null" class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {{ roundedRating }}
        </span>
        <!-- Hype (upcoming games) -->
        <span v-else-if="game.hypes != null" class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-orange-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1C8.5 7 10 10 7 13c-1.5-2-1-4-1-4C3.5 11 2 14 2 17a10 10 0 0 0 20 0c0-6-4-12-10-16zm0 18a4 4 0 0 1-4-4c0-2.5 2-5 4-6 2 1 4 3.5 4 6a4 4 0 0 1-4 4z" />
          </svg>
          {{ game.hypes }}
        </span>
        <span aria-hidden="true">·</span>
        <span>{{ releaseYear }}</span>
      </div>
    </div>
  </article>
</template>
