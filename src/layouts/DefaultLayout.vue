<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <div class="flex h-dvh">
    <AppSidebar />
    <div class="flex flex-1 flex-col overflow-hidden">
      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
      <ThemeToggle />
    </div>
  </div>
</template>
