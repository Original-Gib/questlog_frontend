<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import NavLink from '@/components/NavLink.vue'

const router = useRouter()
const auth = useAuthStore()
const theme = useThemeStore()

function logout() {
  auth.clearAuth()
  router.push({ name: 'login' })
}
</script>

<template>
  <aside class="flex h-dvh w-60 flex-col justify-between px-4 py-6">
    <div class="flex flex-col gap-6">
      <RouterLink :to="{ name: 'home' }" class="text-xl font-bold tracking-tight">
        QuestLog
      </RouterLink>

      <nav>
        <ul class="flex flex-col gap-1">
          <li><NavLink :to="{ name: 'home' }" exact>Home</NavLink></li>
          <li><NavLink :to="{ name: 'game-search' }">Search Games</NavLink></li>
          <li><NavLink :to="{ name: 'library' }">My Library</NavLink></li>
          <li><NavLink :to="{ name: 'wishlist' }">Wishlist</NavLink></li>
          <li><NavLink :to="{ name: 'analytics' }">Analytics</NavLink></li>
        </ul>
      </nav>
    </div>

    <div class="flex flex-col gap-3 text-sm">
      <label class="flex cursor-pointer items-center justify-between px-3 py-2">
        <span>{{ theme.isDark ? 'Dark mode' : 'Light mode' }}</span>
        <button
          role="switch"
          :aria-checked="theme.isDark"
          class="relative h-6 w-11 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          :class="theme.isDark ? 'bg-accent' : 'bg-muted'"
          @click="theme.toggle"
        >
          <span
            class="absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition-transform duration-200"
            :class="theme.isDark ? 'translate-x-5' : 'translate-x-0'"
          >
            <!-- Moon: dark mode active -->
            <svg v-if="theme.isDark" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <!-- Sun: light mode active -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </span>
        </button>
      </label>
      <div class="flex items-center justify-between gap-2">
        <span class="truncate">{{ auth.user?.username }}</span>
        <button class="rounded-md px-2 py-1 hover:bg-black/10 dark:hover:bg-white/10" @click="logout">Logout</button>
      </div>
    </div>
  </aside>
</template>
