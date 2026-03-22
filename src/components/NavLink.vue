<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'

defineProps<{
  to: RouteLocationRaw
  exact?: boolean
}>()
</script>

<template>
  <RouterLink v-slot="{ isActive, isExactActive, href, navigate }" :to="to" custom>
    <a
      :href="href"
      :class="[
        'block rounded-md px-3 py-2 text-sm',
        (exact ? isExactActive : isActive)
          ? 'bg-accent text-white font-semibold'
          : 'hover:bg-black/10 dark:hover:bg-white/10',
      ]"
      @click="navigate"
    >
      <slot />
    </a>
  </RouterLink>
</template>
