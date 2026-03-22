<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const imageModules = import.meta.glob('@/assets/images/login/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
})
const images = Object.values(imageModules) as string[]

const currentIndex = ref(0)

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (images.length > 1) {
    interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % images.length
    }, 5000)
  }
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="relative flex min-h-dvh flex-col">
    <!-- Background carousel -->
    <template v-if="images.length > 0">
      <transition-group name="bg-fade">
        <div
          v-for="(image, i) in images"
          v-show="i === currentIndex"
          :key="image"
          class="absolute inset-0 bg-cover bg-center"
          :style="`background-image: url('${image}')`"
        />
      </transition-group>
    </template>

    <!-- Glassy overlay -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />

    <!-- Content -->
    <div class="relative flex flex-1 items-center justify-center px-4">
      <RouterView />
    </div>
    <div class="relative text-white/70">
      <ThemeToggle />
    </div>
  </div>
</template>

<style scoped>
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 1s ease;
}
.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}
</style>
