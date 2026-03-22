<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

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
          <li>
            <RouterLink
              :to="{ name: 'home' }"
              class="block rounded-md px-3 py-2 text-sm hover:bg-white/10"
              active-class="bg-white/10 font-semibold"
            >
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'game-search' }"
              class="block rounded-md px-3 py-2 text-sm hover:bg-white/10"
              active-class="bg-white/10 font-semibold"
            >
              Search Games
            </RouterLink>
          </li>

          <li>
            <RouterLink
              :to="{ name: 'library' }"
              class="block rounded-md px-3 py-2 text-sm hover:bg-white/10"
              active-class="bg-white/10 font-semibold"
            >
              My Library
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'wishlist' }"
              class="block rounded-md px-3 py-2 text-sm hover:bg-white/10"
              active-class="bg-white/10 font-semibold"
            >
              Wishlist
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'analytics' }"
              class="block rounded-md px-3 py-2 text-sm hover:bg-white/10"
              active-class="bg-white/10 font-semibold"
            >
              Analytics
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="flex items-center justify-between gap-2 text-sm">
      <span class="truncate">{{ auth.user?.username }}</span>
      <button class="rounded-md px-2 py-1 hover:bg-white/10" @click="logout">Logout</button>
    </div>
  </aside>
</template>
