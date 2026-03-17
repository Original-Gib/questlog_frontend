<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <h1>Game {{ route.params.id }}</h1>
  </div>
</template>
