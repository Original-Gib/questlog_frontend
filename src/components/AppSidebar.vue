<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NavLink from '@/components/NavLink.vue'

const router = useRouter()
const auth = useAuthStore()

async function logout() {
  await auth.logout()
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

    <div class="flex items-center justify-between gap-2 text-sm">
      <span class="truncate">{{ auth.user?.email }}</span>
      <button class="rounded-md px-2 py-1 hover:bg-black/10 dark:hover:bg-white/10" @click="logout">Logout</button>
    </div>
  </aside>
</template>
