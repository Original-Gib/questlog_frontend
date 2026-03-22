<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-white px-4 dark:bg-canvas">
    <div class="flex flex-1 items-center justify-center">
      <RouterView />
    </div>
    <ThemeToggle />
  </div>
</template>
