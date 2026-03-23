<script setup lang="ts">
import PlaystationIcon from '@/assets/icons/platforms/playstation.svg?component'
import XboxIcon from '@/assets/icons/platforms/xbox.svg?component'
import WindowsIcon from '@/assets/icons/platforms/windows.svg?component'
import NintendoSwitchIcon from '@/assets/icons/platforms/nintendo-switch.svg?component'
import AppleIcon from '@/assets/icons/platforms/apple.svg?component'
import AndroidIcon from '@/assets/icons/platforms/android.svg?component'
import SteamIcon from '@/assets/icons/platforms/steam.svg?component'

defineProps<{ platform: string }>()
</script>

<template>
  <span :title="platform" class="inline-flex items-center justify-center">
    <PlaystationIcon v-if="platform.startsWith('PlayStation')" class="h-full w-full" aria-hidden="true" />
    <XboxIcon v-else-if="platform.startsWith('Xbox')" class="h-full w-full" aria-hidden="true" />
    <WindowsIcon v-else-if="platform === 'PC (Microsoft Windows)'" class="h-full w-full" aria-hidden="true" />
    <NintendoSwitchIcon v-else-if="platform === 'Nintendo Switch'" class="h-full w-full" aria-hidden="true" />
    <AppleIcon v-else-if="platform === 'iOS' || platform === 'macOS'" class="h-full w-full" aria-hidden="true" />
    <AndroidIcon v-else-if="platform === 'Android'" class="h-full w-full" aria-hidden="true" />
    <SteamIcon v-else-if="platform === 'Steam'" class="h-full w-full" aria-hidden="true" />

    <!-- Fallback: generic gamepad -->
    <svg v-else viewBox="0 0 24 24" class="h-full w-full" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="4" />
      <path d="M6 12h4M8 10v4" />
      <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
    </svg>
  </span>
</template>
